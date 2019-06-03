/**
 * This file is JavaScript Class and splits off all the bot initializing logic
 * from the main app file.
 * Splitting this off is a good practice as it means your bot configuration
 * is not jumbled up with the app initiation.
 */

const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const sqlite = require('sqlite');
const path = require('path');
const log = require('./utils/winston');
const { oneLine } = require('common-tags');
const moment = require('moment');

class DiscordBot {
  /**
   * Constructor for the Discord Bot. Sets the token to the class as well as
   * created the client with the given prefix and owner ID. You can put
   * a lot more configuration here, view the Discord.JS-Commando docs
   * on CommandoClient here: {@link https://discord.js.org/#/docs/commando/djs-v11/class/CommandoClient}
   * @param {string} token the token for the bot
   */
  constructor (token) {
    this.token = token;
    this.client = new CommandoClient({
      commandPrefix: '{{prefix}}',
      owner: ['{{ownerid}}']
    });
  }

  /**
   * Initializes the constructed client
   * This method has all the logic of
   *   - event handling
   *   - Settings provider initialization
   *   - Registry initialization
   *   - and Login
   * This method gets called from app.js and once ran your bot will be running
   */
  init () {
    this.client
      // Logs errors
      .on('error', (err) => log.error(err))
      // Logs when the bot is ready
      .on('ready', () => log.info(this.readyMessage()))
      // Logs warnings
      .on('warn', (warning) => log.warn(warning));

    // Ensures the bot doesn't crash when it runs into an unhandled rejection, an otherwise process crashing NodeJS exception
    process.on('unhandledRejection', (reason, promise) => log.error(reason));

    // Set the client provider to an sqlite database
    this.client.setProvider(
      sqlite.open(path.join(__dirname, 'data', 'databases', 'settings.sqlite3')).then(db => new SQLiteProvider(db))
    ).catch(console.error);

    // Initialize the bot registry
    this.client.registry
      // Register the types given by Commando
      .registerDefaultTypes()
      // Register the default command groups given by Commando
      .registerDefaultGroups()
      // Register the default commands given by Commando (help, eval, ping etc.)
      .registerDefaultCommands()
      // Register our own command groups
      .registerGroups([
        ['info', 'Informational commands']
      ])
      // Register our own commands
      .registerCommandsIn(path.join(__dirname, 'commands'));

    // Login the bot
    return this.client.login(this.token);
  }

  /**
   * Side effect method used by the client.on('ready') event to log that
   * the bot is online, as well as its username, discriminator and ID.
   */
  readyMessage () {
    return oneLine`Client ready at ${moment().format('HH:mm:ss')};
      logged in as ${this.client.user.username}#${this.client.user.discriminator} (${this.client.user.id})`;
  }
}

module.exports = DiscordBot;
