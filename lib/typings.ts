export interface YargResult {
  help: boolean;
  version: boolean;
  interactive: boolean;
  name: string;
  description: string;
  author: string;
  license: 'MIT' | 'GPL-3.0-or-later' | 'Apache-2.0' | 'Unlicense' | 'MPL-2.0';
  repo: string;
  gitinit: boolean;
  manager: 'npm' | 'yarn';
  template: 'javascript' | 'typescript';
  prefix: '!' | string;
  ownerid: string;
  token: string;
}

export type ICreateDJSBotInfo = {
  shortName?: string;
  botDestination?: string;
} & YargResult;

export interface DefaultYargOptions {
  author: string;
  license: 'MIT' | 'GPL-3.0-or-later' | 'Apache-2.0' | 'Unlicense' | 'MPL-2.0';
  manager: 'npm' | 'yarn';
  template: 'javascript' | 'typescript';
  description: string;
  repo: string;
  prefix: '!' | string;
  ownerid: string;
  token: string;
}
