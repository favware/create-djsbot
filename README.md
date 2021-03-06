<div align="center">
  <p>
  <a href="https://favware.tech"><img src="https://cdn.favware.tech/img/create-discordbot.png" height="200" alt="logo"/></a>
  </p>

  <p>
<h1> Create DJS Bort </h1>
<h3> Bootstrapping CLI tool for quickly setting up a Discord bot project </h3>
  </p>

</div>

---

**Project Status**

[![GitHub](https://img.shields.io/github/license/favware/create-djsbot?logo=github&style=flat-square)](https://github.com/favware/create-djsbot/blob/main/LICENSE.md)
[![CircleCI](https://img.shields.io/circleci/build/github/favware/create-djsbot?logo=circleci&style=flat-square)](https://circleci.com/gh/favware/create-djsbot/tree/main)

**NPM Versions**

[![npm](https://img.shields.io/npm/v/create-djsbot?color=crimson&label=create-djsbot%20version&logo=npm&style=flat-square)](https://www.npmjs.com/package/create-djsbot)

**Social Media and Donations**

[![Join Discord server](https://img.shields.io/discord/512303595966824458?color=697EC4&label=Join%20Discord%20Server&logo=discord&logoColor=FDFEFE&style=flat-square)](https://join.favware.tech/)
[![Twitter Follow](https://img.shields.io/twitter/follow/favna_?label=Follow%20@Favna_&logo=twitter&colorB=1DA1F2&style=flat-square)](https://twitter.com/Favna_/follow)
[![Patreon Donate](https://img.shields.io/badge/patreon-donate-brightgreen.svg?label=Donate%20with%20Patreon&logo=patreon&colorB=F96854&style=flat-square&link=https://donate.favware.tech/patreon)](https://donate.favware.tech/patreon)
[![PayPal Donate](https://img.shields.io/badge/paypal-donate-brightgreen.svg?label=Donate%20with%20Paypal&logo=paypal&colorB=00457C&style=flat-square&link=https://donate.favware.tech/paypal)](https://donate.favware.tech/paypal)

# Install

## Using Yarn

```sh
yarn create djsbot
# or for reusability
yarn global add create-djsbot
create-djsbot mybot
```

## Using NPM

```sh
npx create-djsbot mybot
# or for reusability
npm install --global create-djsbot
create-djsbot mybot
```

### Answer some basic prompts about your module, and then the CLI will perform the following steps:

- copy over the template
- install dependencies via yarn or npm
- initialize local git repo

# Documentation

## Status of this project

Before documenting anything else I just want to put out here that I'll maintain this project in terms of (security) issues, major updates are less likely to come quickly if at all. This is because these templates are based on the Commando framework whilst I have moved to the Klasa framework myself for my own bot. That said however this generator is still a great way to get started with any bot regardless of framework you end up using.

## Features

- Easy to use CLI
- ESLint for linting
- Utilizes the [DiscordJS-Commando](https://github.com/discordjs/Commando) framework
- Optional support for TypeScript
- (TypeScript only) Interactive reloading script for single files for hot-reloading

## Usage

```sh
Create DJSBot - Easily bootstrap your bot!

Usage:
    create-djsbot
    create-djsbot --help
    create-djsbot --name mybot

Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --interactive                                                        [default: true]
  --name         What is the name of your bot project?
  --description  What is the description for this bot?
  --author       Who is the author of the bot? (GitHub username)
  --license      What license do you want the bot to have?             [choices: "MIT", "GPL-3.0-or-later", "Apache-2.0", "Unlicense", "MPL-2.0"]
  --repo         Do you have an URL for the Git repository for the bot?
  --gitinit      Should a the repo be initialized with "git init"?
  --manager      Do you want to use Yarn or NPM?                       [choices: "npm", "yarn"]
  --template     Do you want to use JavaScript or TypeScript?          [choices: "javascript", "typescript"]
  --prefix       What is the bot prefix you want to set as default?
  --ownerid      What is your Discord userID that will be registered as the bot owner?
  --token        And lastly, do you already have a token the bot will use?
```

## Setting up development environment

If the template fails to run the `npm install` or `yarn install`, please follow these instructions before getting support:

- Windows:
  - run `npm i windows-build-tools --production --vs2015 --add-python-to-PATH --global` in an administrative CMD or Powershell
- MacOS:
  - Install the XCode Selects tools: `xcode-select --install`
  - Install Brew: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- Linux Debian / Ubuntu:
  - Install build-essential: `sudo apt-get install -y build-essential`
- Other OS / distro's:
  - Please google how to install build essentials such as GCC and Make

## Notes about the TypeScript template

A few notes should be shared about the TypeScript template that are important to note

1. It uses forks of Discord.JS and Discord.JS-Commando that are based on the "master" branch so please refer to the "master" documentation. The reason for this is that Commando has added a lot of extra TypeScript support since it's latest stable release and when using the "master" branch for Discord.JS-Commando then the master branch for Discord.JS should also be used. I (Favna) manage these forks and ensure they are always stable before publishing any updates as I use them in my own bot

2. In TypeScript you should to use ES6 imports/exports rather than CommonJS `module.exports` and `require` as it's far more efficient, adds a lot of cool features such as default exports, named exports and advanced imports and it's far easier to write and remember.

3. You should **not** use `ts-node` to run your bot unless during development. It is very slow and inefficient for production environments.

4. Therefore always compile your bot to JavaScript using `npm run build` or `yarn build`

5. And do not remove anything from the `build`, `prebuild`, `postbuild`, `copyfiles` or `replace` scripts. Doing so will either cause your bot to not build properly at all, or cause inefficiencies in the long term. Adding to it is perfectly fine however!

6. The TypeScript config allows you to use aliases for easier accessing the `commands` and `utils` folders. For example if you need to log something you can `import log from '@utils/winston'` (which imports the `winston.ts` file at `src/utils/winston.ts`, no matter how many subfolders deep you are) then use this as `log.info()`.

7. When getting support anywhere always specify that you are writing TypeScript to get the best support.

8. You can always join my server for support as well.

---

# About

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://www.github.com/favware/create-djs-bot/issues/new).

## License

Copyright © 2018-2019, [Favware](https://github.com/favware).
Released under the [MIT License](LICENSE.md).

## Special Thanks

- The [DiscordJS team](https://github.com/discordjs/people) for the [DiscordJS Library](https://github.com/discordjs/discord.js) and [Commando Framework](https://github.com/discordjs/Commando)

- Travis Fischer for the project [create-react-library](https://yarnpkg.com/en/package/create-react-library) which inspired me to make this
