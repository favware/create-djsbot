import getGitConfigPath from 'git-config-path';
import githubUsername from 'github-username';
import { sync as parseGitConfig } from 'parse-git-config';
import which from 'which';

import { DefaultYargOptions } from './create-discordbot';

export const fetchDefaults = async (name: string): Promise<DefaultYargOptions> => {
    const gitConfigPath = getGitConfigPath('global');
    const defaultValues: DefaultYargOptions = {
        author: 'BotDeveloper',
        license: 'MIT',
        manager: 'npm',
        template: 'javascript',
        description: 'Discord bot bootstrapped with create-discordbot',
        repo: '',
    };

    if (gitConfigPath) {
        const gitConfig = parseGitConfig({ path: gitConfigPath });

        if (gitConfig.github && gitConfig.github.user) {
            defaultValues.author = gitConfig.github.user;
        } else if (gitConfig.user && gitConfig.user.email) {
            defaultValues.author = await githubUsername(gitConfig.user.email, '75062aad298a8515d4b3e43a8ff18ac249ac3bf8');
        }
    }

    if (which.sync('yarn', { nothrow: true })) defaultValues.manager = 'yarn';

    return {...defaultValues, repo: `https://github.com/${defaultValues.author}/${name}.git`}
};

export default fetchDefaults;