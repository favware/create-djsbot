const { config } = require('dotenv');
const path = require('path');
const DiscordBot = require('./DiscordBot');
const chalk = require('chalk');
const { stripIndents } = require('common-tags');

config({
  path: path.join(__dirname, '..', '.env'),
  encoding: 'utf8',
  debug: false
});

if (!process.env.DEVELOPMENT_TOKEN | !process.env.PRODUCTION_TOKEN) {
  return console.error(
    chalk.red(stripIndents`
        Looks like you didn't set either the DEVELOPMENT_TOKEN or PRODUCTION_TOKEN in the .env file
        Please set both of these tokens.
        You can find more info about these tokens in the README.
    `)
  )
}

new DiscordBot(process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_TOKEN : process.env.PRODUCTION_TOKEN).init();
