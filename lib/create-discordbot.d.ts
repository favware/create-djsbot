import { Option, OptionData } from 'yargs-interactive';

export interface YargsOptionData extends OptionData {
    type: 'input' | 'confirm' | 'list';
    choices?: string[];
}

export type YargOptions = {
    [key: string]: YargsOptionData | { default: boolean };
};

export type YargResult = {
    _: any[];
    help: boolean;
    version: boolean;
    interactive: boolean;
    '$0': string;
    name: string;
    description: string;
    author: string;
    license: 'MIT' | 'GPL-3.0-or-later' | 'Apache-2.0' | 'Unlicense' | 'MPL-2.0',
    repo: string;
    gitinit: boolean;
    manager: 'npm' | 'yarn';
    template: 'javascript' | 'typescript';
}

export type DefaultYargOptions = {
    author: string;
    license: 'MIT' | 'GPL-3.0-or-later' | 'Apache-2.0' | 'Unlicense' | 'MPL-2.0';
    manager: 'npm' | 'yarn'
    template: 'javascript' | 'typescript';
    description: string;
    repo: string;
}