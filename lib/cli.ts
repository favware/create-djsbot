#!/usr/bin/env node

import chalk from 'chalk';
import { oneLine, stripIndent } from 'common-tags';
import yargsInteractive from 'yargs-interactive';
import createDiscordbot from './createDiscordbot';
import getDefaultOptions from './getDefaultOptions';
import { YargOptions, YargResult } from './typings';

const hasOwnProperty = <O = undefined>(
    obj: O extends undefined ? object : O, prop: O extends undefined ? any : keyof O
) => Object.prototype.hasOwnProperty.call(obj, prop);

export const setupBoilerplate = () => {
    try {
        const yargOptions: YargOptions = {
            interactive: {
                default: true,
            },
            name: {
                type: 'input',
                describe: 'What is the name of your bot project?',
            },
            description: {
                type: 'input',
                describe: 'What is the description for this bot?',
            },
            author: {
                type: 'input',
                describe: 'Who is the author of the bot?',
            },
            license: {
                type: 'list',
                describe: 'What license do you want the bot to have?',
                choices: ['MIT', 'GPL-3.0-or-later', 'Apache-2.0', 'Unlicense', 'MPL-2.0'],
            },
            repo: {
                type: 'input',
                describe: 'Do you have an URL for the Git repository for the bot?',
            },
            gitinit: {
                type: 'confirm',
                describe: 'Should a the repo be initialized with "git init"?',
            },
            manager: {
                type: 'list',
                describe: 'Do you want to use Yarn or NPM?',
                choices: ['npm', 'yarn'],
            },
            template: {
                type: 'list',
                describe: 'Do you want to use JavaScript or TypeScript?',
                choices: ['javascript', 'typescript'],
            },
        };

        yargsInteractive()
            .usage(stripIndent`
                ${chalk.yellow('Create Discordbot - Easily bootstrap your bot!')}

                ${chalk.cyan('Usage:')}
                    ${chalk.green('create-discordbot')}
                    ${chalk.green('create-discordbot')} --help
                    ${chalk.green('create-discordbot')} --name mybot
            `)
            .interactive(yargOptions)
            .then(async (result: YargResult) => {
                try {
                    if (!result.name) throw new Error('no_name');

                    const defaults = await getDefaultOptions(result.name, result.author);

                    if (!result.description) result.description = defaults.description;
                    if (!result.author) result.author = defaults.author;
                    if (!result.license) result.license = defaults.license;
                    if (!result.manager) result.manager = defaults.manager;
                    if (!result.template) result.template = defaults.template;
                    if (!result.repo) result.repo = defaults.repo;
                    if (!hasOwnProperty<typeof result>(result, 'gitinit')) result.gitinit = true;

                    await createDiscordbot(result);
                } catch (err) {
                    // tslint:disable:no-console
                    if (/(?:no_name)/i.test(err.toString())) {
                        return console.error(chalk.red('You didn\'t give a name for the bot. This is a mandatory property!'));
                    }

                    console.error(chalk.red(oneLine`
                            Something unexpected went wrong,
                            please contact Favware (see https://favware.tech/contact for methods to do so).
                            Following is the stacktrace which can be used to trace the issue:
                    `));

                    return console.error(err.stack);
                    // tslint:enable:no-console
                }
            });
    } catch (err) {
        // tslint:disable:no-console
        console.error(chalk.red(oneLine`
                Something unexpected went wrong,
                please contact Favware (see https://favware.tech/contact for methods to do so).
                Following is the stacktrace which can be used to trace the issue:
        `));

        return console.error(err.stack);
        // tslint:enable:no-console
    }
};

export default setupBoilerplate;