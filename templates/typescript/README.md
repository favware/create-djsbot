# {{name}}

> {{description}}

This priject was bootstrapped with [Create DJS Bot](https://favware.tech/createdjsbot).

## Before running any code

This project uses dotenv for configuration such as your token. The values are stored in the .env file you'll find in the same folder as this README. If you didn't set the token during setup you'll have to enter it in the file between the `" "` at the `BOT_TOKEN` line. For example:

```dotenv
BOT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
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

7. And do not remove anything from the `build`, `prebuild`, `postbuild`, `copyfiles` or `replace` scripts. Doing so will either cause your bot to not build properly at all, or cause inefficiencies in the long term. Adding to it is perfectly fine however!

8. The TypeScript config allows you to use aliases for easier accessing the `commands` and `utils` folders. For example if you need to log something you can `import log from '@utils/winston'` (which imports the `winston.ts` file at `src/utils/winston.ts`, no matter how many subfolders deep you are) then use this as `log.info()`.

9. When getting support anywhere always specify that you are writing TypeScript to get the best support.

10. You can always join my server for support as well.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the discord bot in development mode<br>
Requires you have set the token in the `.env` file!

### `npm run lint`

Checks your code for linting errors

### `npx gulp --src ./src/path/to/single/ts/file`

*e.g. `npx gulp --src ./src/commands/info/userinfo.ts`

To recompile just a single file (i.e. for hot reloading) this project uses Gulp.

## Documenation

For documentation on how to continue from here please go over the Discord.JS documentation.

- The official docs: [Click Here](https://discord.js.org/#/docs/main/stable/general/welcome)
- The official guide: [Click Here](https://discordjs.guide/)
- An Idiots Guide: [Click Here](https://anidiots.guide/)
- An Idiots Guide - YouTube: [Click Here](https://www.youtube.com/channel/UCLun-hgcYUgNvCCj4sIa-jA)

## License

{{license}} © [{{author}}](https://github.com/{{author}})
