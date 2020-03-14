#!/usr/bin/env node

import chalk from 'chalk';
import yargsInteractive, { OptionData } from 'yargs-interactive';
import createDJSBot from './createDJSBot';
import getDefaultOptions from './getDefaultOptions';
import { YargResult } from './typings';

const hasOwnProperty = <O extends {}>(obj: O, prop: keyof O) => prop in obj;

const parseBooleanLikeInput = (input: unknown) => {
  switch (input) {
    case 'no':
    case 'false':
    case 'off':
    case '0':
    case 0:
    case false:
      return false;
    default:
      return true;
  }
};

export const setupBoilerplate = async () => {
  try {
    const yargOptions: Record<string, OptionData | { default: boolean }> = {
      interactive: { default: true },
      name: {
        type: 'input',
        describe: 'What is the name of your bot project?'
      },
      description: {
        type: 'input',
        describe: 'What is the description for this bot?'
      },
      author: {
        type: 'input',
        describe: 'Who is the author of the bot? (GitHub username)'
      },
      license: {
        type: 'list',
        describe: 'What license do you want the bot to have?',
        choices: ['MIT', 'GPL-3.0-or-later', 'Apache-2.0', 'Unlicense', 'MPL-2.0']
      },
      repo: {
        type: 'input',
        describe: 'Do you have an URL for the Git repository for the bot?'
      },
      gitinit: {
        type: 'confirm',
        describe: 'Should a the repo be initialized with "git init"?'
      },
      manager: {
        type: 'list',
        describe: 'Do you want to use Yarn or NPM?',
        choices: ['npm', 'yarn']
      },
      template: {
        type: 'list',
        describe: 'Do you want to use JavaScript or TypeScript?',
        choices: ['javascript', 'typescript']
      },
      prefix: {
        type: 'input',
        describe: 'What is the bot prefix you want to set as default?'
      },
      ownerid: {
        type: 'input',
        describe: 'What is your Discord userID that will be registered as the bot owner?'
      },
      token: {
        type: 'input',
        describe: 'And lastly, do you already have a token the bot will use?'
      }
    };

    const result: YargResult = await yargsInteractive()
      .usage(
        [
          chalk.yellow('Create DJSBot - Easily bootstrap your bot!'),
          chalk.cyan('Usage:'),
          `${chalk.green('create-djsbot')}`,
          `${chalk.green('create-djsbot')} --help`,
          `${chalk.green('create-djsbot')} --name mybot`
        ].join('\n')
      )
      .interactive(yargOptions);

    if (!result.name) throw new Error('no_name');

    const defaults = await getDefaultOptions(result.name, result.author);

    if (!result.description) result.description = defaults.description;
    if (!result.author) result.author = defaults.author;
    if (!result.license) result.license = defaults.license;
    if (!result.manager) result.manager = defaults.manager;
    if (!result.template) result.template = defaults.template;
    if (!result.repo) result.repo = defaults.repo;
    if (!result.prefix) result.prefix = defaults.prefix;
    if (!result.ownerid) result.ownerid = defaults.ownerid;
    if (!result.token) result.token = defaults.token;
    if (!hasOwnProperty<typeof result>(result, 'gitinit')) result.gitinit = true;
    result.gitinit = parseBooleanLikeInput(result.gitinit);

    await createDJSBot(result);
  } catch (err) {
    if (/(?:no_name)/i.test(err.toString())) {
      throw new Error("You didn't give a name for the bot. This is a mandatory property!");
    }

    // eslint-disable-next-line no-console
    console.error(
      chalk.red(
        [
          'Something unexpected went wrong,',
          'please contact Favware (see https://favware.tech/contact for methods to do so).',
          'Following is the stacktrace which can be used to trace the issue:'
        ].join(' ')
      )
    );
  }
};

export default setupBoilerplate;
