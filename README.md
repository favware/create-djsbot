<div align="center">
<p>
<a href="https://favware.tech/create-discordbot">
<img src="https://storage.googleapis.com/data-sunlight-146313.appspot.com/website-project-icons/create-discordbot.png" height="200" alt="logo">
</a>
</p>

<p>
<h1> @Favware/Create-Discordbot </h1>
<h3> Bootstrapping CLI tool for quickly setting up a Discord bot project </h3>
</p>

<p>
<a href="https://github.com/favware/create-discordbot/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/favware/create-discordbot.svg?style=flat-square" alt="License"></a><!--
--><a href="https://www.npmjs.com/package/@favware/create-discordbot"><img src="https://img.shields.io/node/v/@favware/create-discordbot.svg?style=flat-square" alt="Node Version"></a><!--
--><a href="https://circleci.com/gh/favware/create-discordbot/tree/master"><img src="https://img.shields.io/circleci/project/github/favware/create-discordbot/master.svg?style=flat-square" alt="Build Status" title="Build Status" /></a>
</p>

<p>
<a href="https://www.npmjs.com/package/@favware/create-discordbot"><img src="https://img.shields.io/bundlephobia/min/@favware/create-discordbot.svg?style=popout-square" alt="NPM bundle size (minified)" title="NPM bundle size (minified)" /></a><!--
--><a href="https://www.npmjs.com/package/@favware/create-discordbot"><img src="https://img.shields.io/bundlephobia/minzip/@favware/create-discordbot.svg?style=flat-square" alt="NPM bundle size (minified + gzip)" title="NPM bundle size (minified + gzip)" /></a><!--
--><a href="https://www.npmjs.com/package/@favware/create-discordbot"><img src="https://img.shields.io/npm/v/@favware/create-discordbot.svg?style=flat-square" alt="NPM Version" title="NPM Version" /></a><!--
--><a href="https://www.npmjs.com/package/@favware/create-discordbot"><img src="https://img.shields.io/npm/dw/@favware/create-discordbot.svg?style=flat-square" alt="NPM Weekly Downloads" title="NPM Weekly Downloads" /></a><!--
--><a href="https://www.npmjs.com/package/@favware/create-discordbot"><img src="https://img.shields.io/npm/dt/@favware/create-discordbot.svg?style=flat-square" alt="NPM Total Downloads" title="NPM Total Downloads" /></a>
</p>
</div>

---

# Install

## Using Yarn

```sh
yarn create @favware/discordbot mybot
# or for reusability
yarn global add @favware/create-discordbot
create-discordbot mybot
```

## Using NPM

```sh
npx @favware/create-discordbot mybot
# or for reusability
npm install --global @favware/create-discordbot
create-discordbot mybot
```

### Answer some basic prompts about your module, and then the CLI will perform the following steps:

- copy over the template
- install dependencies via yarn or npm
- initialize local git repo

# Documentation

## Features

- Easy to use CLI
- ESLint or TSLint for linting
- Utilizes the [DiscordJS-Commando](https://github.com/discordjs/Commando) framework
- Optional support for TypeScript
- (TypeScript only) Gulp for reloading single files for hot-reloading

## Usage

```sh
Create Discordbot - Easily bootstrap your bot!

Usage:
    create-discordbot
    create-discordbot --help
    create-discordbot --name mybot

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

## Notes about the TypeScript template

A few notes should be shared about the TypeScript template that are important to note

1. It uses forks of Discord.JS and Discord.JS-Commando that are based on the "master" branch so please refer to the "master" documentation. The reason for this is that Commando has added a lot of extra TypeScript support since it's latest stable release and when using the "master" branch for Discord.JS-Commando then the master branch for Discord.JS should also be used. I (Favna) manage these forks and ensure they are always stable before publishing any updates as I use them in my own bot

2. The TypeScript version uses `better-sqlite3` as SQLite library. This is because in performance comparisons it performs better than libraries such as SQLite. The caveat however is that it needs a bit of extra work in setup. If the template fails to run the `npm install` or `yarn install`, please follow these instructions before getting support:

   - Windows:
     - run `npm i windows-build-tools --production --vs2015 --add-python-to-PATH --global` in an administrative CMD or Powershell
   - MacOS:
     - Install the XCode Selects tools: `xcode-select --install`
     - Install Brew: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
   - Linux Debian / Ubuntu:
      -  Install build-essential: `sudo apt-get install -y build-essential`
   - Other OS / distro's:
      - Please google how to install build essentials such as GCC and Make
 

3. In TypeScript you should to use ES6 imports/exports rather than CommonJS `module.exports` and `require` as it's far more efficient, adds a lot of cool features such as default exports, named exports and advanced imports and it's far easier to write and remember.

4. The Gulpfile is for recompiling single JavaScript files into TypeScript files for hot-reloading commands once you have your bot running on some kind of server

   - gulp is a taskrunner, much like NPM scripts but far more configurable

5. You should **not** use `ts-node` to run your bot unless during development. It is very slow and inefficient for production environments.

6. Therefore always compile your bot to JavaScript using `npm run build` or `yarn build`

7. And do not remove anything from the `build`, `prebuild`, `postbuild`, `copyfiles`, `replace` or `terser` scripts. Doing so will either cause your bot to not build properly at all, or cause inefficiencies in the long term. Adding to it is perfectly fine however!

8. The TypeScript config allows you to use aliases for easier accessing the `commands` and `utils` folders. For example if you need to log something you can `import log from '@utils/winston'` (which imports the `winston.ts` file at `src/utils/winston.ts`, no matter how many subfolders deep you are) then use this as `log.info()`.

9. When getting support anywhere always specify that you are writing TypeScript to get the best support.

10. You can always join my server for support as well.

* * *

# About

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://www.github.com/favware/yamlreader/issues/new).

## License

Copyright © 2018-2019, [Favware](https://github.com/favware).
Released under the [MIT License](LICENSE/md).

## Special Thanks

- The [DiscordJS team](https://github.com/discordjs/people) for the [DiscordJS Library](https://github.com/discordjs/discord.js) and [Commando Framework](https://github.com/discordjs/Commando)

- Travis Fischer for the project [create-react-library](https://yarnpkg.com/en/package/create-react-library) which inspired me to make this

## Buy me a donut

This project is open source and always will be, even if I don't get donations. That said, I know there are people out there that may still want to donate just to show their appreciation so this is for you guys. Thanks in advance!

I accept donations through PayPal, BitCoin, Ethereum and LiteCoin. You can use the buttons below to donate through your method of choice

|Donate With|QR|Address|
|:---:|:---:|:---:|
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XMAYCF9SDHZ34"><img src="https://storage.googleapis.com/data-sunlight-146313.appspot.com/ribbon/paypaldonate.png"></a>|<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XMAYCF9SDHZ34"><img src="https://storage.googleapis.com/data-sunlight-146313.appspot.com/ribbon/paypalqr.png" width="128"></a>|[Donate with PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XMAYCF9SDHZ34)|
<img src="https://storage.googleapis.com/data-sunlight-146313.appspot.com/ribbon/bitcoindonate.png">|<img src="https://storage.googleapis.com/data-sunlight-146313.appspot.com/ribbon/bitcoinqr.png" width="128">|<a href="bitcoin:1E643TNif2MTh75rugepmXuq35Tck4TnE5?amount=0.01&label=favware%27%20Ribbon%20Discord%20Bot">1E643TNif2MTh75rugepmXuq35Tck4TnE5</a>|
<img src="https://storage.googleapis.com/data-sunlight-146313.appspot.com/ribbon/ethereumdonate.png">|<img src="https://storage.googleapis.com/data-sunlight-146313.appspot.com/ribbon/ethereumqr.png" width="128">|<a href="ethereum:0xF653F666903cd8739030D2721bF01095896F5D6E?amount=0.01&label=favware%27%20Ribbon%20Discord%20Bot">0xF653F666903cd8739030D2721bF01095896F5D6E</a>|
<img src="https://storage.googleapis.com/data-sunlight-146313.appspot.com/ribbon/litecoindonate.png">|<img src="https://storage.googleapis.com/data-sunlight-146313.appspot.com/ribbon/litecoinqr.png" width="128">|<a href="litecoin:LZHvBkaJqKJRa8N7Dyu41Jd1PDBAofCik6?amount=0.01&label=favware%27%20Ribbon%20Discord%20Bot">LZHvBkaJqKJRa8N7Dyu41Jd1PDBAofCik6</a>|
