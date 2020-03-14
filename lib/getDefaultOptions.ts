import getGitConfigPath from 'git-config-path';
import githubUsername from 'github-username';
import { promise as cliSpinner } from 'ora';
import { sync as parseGitConfig } from 'parse-git-config';
import which from 'which';
import { DefaultYargOptions } from './typings';

export const fetchDefaults = async (name: string, author: string): Promise<DefaultYargOptions> => {
  const gitConfigPath = getGitConfigPath('global');
  const defaultValues: DefaultYargOptions = {
    author: 'BotDeveloper',
    license: 'MIT',
    manager: 'npm',
    template: 'javascript',
    description: 'Discord bot bootstrapped with create-djsbot',
    repo: '',
    prefix: '!',
    ownerid: '',
    token: ''
  };

  if (gitConfigPath && !author) {
    const gitConfig = parseGitConfig({ path: gitConfigPath });

    if (gitConfig.github && gitConfig.github.user) {
      defaultValues.author = gitConfig.github.user;
    } else if (gitConfig.user && gitConfig.user.email) {
      const username = githubUsername(gitConfig.user.email, '');
      cliSpinner(username, 'Fetching GitHub username for your configured GitHub email');
      defaultValues.author = await username;
    }
  }

  if (which.sync('yarn', { nothrow: true })) defaultValues.manager = 'yarn';

  return { ...defaultValues, repo: `https://github.com/${defaultValues.author}/${name}.git` };
};

export default fetchDefaults;
