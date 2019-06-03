const { config } = require('dotenv');
const path = require('path');
const DiscordBot = require('./DiscordBot');
const chalk = require('chalk');
const { stripIndents } = require('common-tags');

/**
 * Loads in the .env file and puts all variables in "process.env"
 * See an example of how to reference these variables all throughout your code below
 * with how the BOT_TOKEN variable is loaded
 */
config({
  path: path.join(__dirname, '..', '.env'),
  encoding: 'utf8',
  debug: false
});

/**
 * Checks if you've set the bot token environment variable
 */
if (!process.env.BOT_TOKEN) {
  return console.error(
    chalk.red(stripIndents`
        Looks like you didn't set the BOT_TOKEN in the .env file
        Please set your token in the file.
        You can find more info about these tokens in the README.
    `)
  )
}

/**
 * Creates and initializes your bot
 */
new DiscordBot(process.env.BOT_TOKEN).init();
