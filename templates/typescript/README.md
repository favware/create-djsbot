# {{name}}

> {{description}}

This priject was bootstrapped with [Create Discord Bot](https://favware.tech/creatediscordbot).

## Before running any code

This project uses dotenv for configuration such as your token. The values are stored in the .env file you'll find in the same folder as this README.

In this README you'll find 2 empty values, `PRODUCTION_TOKEN` and `DEVELOPMENT_TOKEN`. You should fill out BOTH of these values before running the bot.
The two tokens can be the same however it is encouraged that you create a seperate bot application for development than for production so you're not writing potentially unstable code in the app running in production. That's what these tokens are for. When the `NODE_ENV` environment variable is set to `development` then the `DEVELOPMENT_TOKEN` will be used, otherwise the `PRODUCTION_TOKEN` will be used.

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
