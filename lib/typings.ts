import { OptionData } from 'yargs-interactive';

export interface IYargsOptionData extends OptionData {
    type: 'input' | 'confirm' | 'list';
    choices?: string[];
}

export type YargOptions = {
    [key: string]: IYargsOptionData | { default: boolean };
};

export type YargResult = {
    help: boolean;
    version: boolean;
    interactive: boolean;
    name: string;
    description: string;
    author: string;
    license: 'MIT' | 'GPL-3.0-or-later' | 'Apache-2.0' | 'Unlicense' | 'MPL-2.0',
    repo: string;
    gitinit: boolean;
    manager: 'npm' | 'yarn';
    template: 'javascript' | 'typescript';
    prefix: '!' | string;
    ownerid: string;
    token: string;
};

export interface ICreateDJSBotInfo extends YargResult {
    shortName?: string;
    botDestination?: string;
}

export type DefaultYargOptions = {
    author: string;
    license: 'MIT' | 'GPL-3.0-or-later' | 'Apache-2.0' | 'Unlicense' | 'MPL-2.0';
    manager: 'npm' | 'yarn'
    template: 'javascript' | 'typescript';
    description: string;
    repo: string;
    prefix: '!' | string;
    ownerid: string;
    token: string;
};