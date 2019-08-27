import { stripIndents } from 'common-tags';
import execa from 'execa';
import fs from 'fs';
import globby from 'globby';
import handlebars from 'handlebars';
import mkdir from 'make-dir';
import { promise as cliSpinner } from 'ora';
import pEachSeries from 'p-each-series';
import path from 'path';
import { ICreateDJSBotInfo } from './typings';

const copyTemplateFiles = async (opts: { file: string; source: string; dest: string; info: ICreateDJSBotInfo }): Promise<string> => {
  const {
    file, source, dest, info,
  } = opts;

  const fileRelativePath = path.relative(source, file);
  const destFilePath = path.join(dest, fileRelativePath);
  const destFileDir = path.parse(destFilePath).dir;

  await mkdir(destFileDir);

  const template = handlebars.compile(fs.readFileSync(file, 'utf8'));
  const content = template({
    ...info,
    yarn: (info.manager === 'yarn'),
  });

  fs.writeFileSync(destFilePath, content, 'utf8');

  return fileRelativePath;
};

const initPackageManager = async (opts: { dest: string; info: ICreateDJSBotInfo }) => {
  const { dest, info } = opts;

  const commands = [
    {
      cmd: `${info.manager} install`,
      cwd: dest,
    }
  ];

  return pEachSeries(commands, async ({ cmd, cwd }) => {
    return execa.command(cmd, { cwd });
  });
};

const fixUpGitIgnoreFile = (opts: { dest: string }) => {
  const { dest } = opts;
  const gitIgnorePath = path.join(dest, '.gitignore');
  fs.writeFileSync(gitIgnorePath,
    stripIndents`
            # Node modules need to be installed through yarn
            node_modules/

            # Any logs created
            *.log
            *.stackdump
            logs/

            # misc
            .DS_Store
            .env
            .env.local
            .env.development.local
            .env.test.local
            .env.production.local

            # IDE settings
            .idea/
            .vs/
            .vscode/

            # Build Output
            dist/
            build/
            tsconfig.tsbuildinfo

            # Data folders
            src/data/databases/*

            # Folder keep
            !**/*.gitkeep
    `, 'utf8');
};

const initGitRepo = async (opts: { dest: string; info: ICreateDJSBotInfo }) => {
  const { dest, info } = opts;
  const cmd = `git init && git add . && git commit -sam "Initialized ${info.shortName}@1.0.0 🎉"`;

  return execa.command(cmd, { cwd: dest });
};

const createDJSBot = async (info: ICreateDJSBotInfo): Promise<string> => {
  const {
    manager, template, name, gitinit,
  } = info;

  const nameParts = name.split('/');
  info.shortName = nameParts[nameParts.length - 1];

  const dest = path.join(process.cwd(), info.shortName);
  info.botDestination = dest;
  await mkdir(dest);

  const source = path.join(__dirname, '..', 'templates', info.template);
  const files = await globby(source, { dot: true });

  const copyTemplateFilesPromise = pEachSeries(files, async file => {
    return copyTemplateFiles({
      file, source, dest, info,
    });
  });
  cliSpinner(copyTemplateFilesPromise, `Copying the ${template} template to ${dest}`);
  await copyTemplateFilesPromise;

  fixUpGitIgnoreFile({ dest });

  const initPackageManagerPromise = initPackageManager({ dest, info });
  cliSpinner(initPackageManagerPromise, `Installing packages with ${manager}`);
  await initPackageManagerPromise;

  if (gitinit) {
    const gitInitPromise = initGitRepo({ dest, info });
    cliSpinner(gitInitPromise, 'Initializing git repository');

    await gitInitPromise;
  }

  return dest;
};

export default createDJSBot;