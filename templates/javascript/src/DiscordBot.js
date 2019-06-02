const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const sqlite = require('sqlite');
const path = require('path');
const log = require('./utils/winston');
const { oneLine } = require('common-tags');
const moment = require('moment');

class DiscordBot {
  constructor (token) {
    this.token = token;
    this.client = new CommandoClient({
      commandPrefix: '{{prefix}}',
      owner: ['{{ownerid}}']
    });
  }

  init () {
    this.client
      .on('error', (err) => log.error(err))
      .on('ready', () => log.info(this.readyMessage()))
      .on('warn', (warning) => log.warn(warning));

    process.on('unhandledRejection', (reason, promise) => log.error(reason));

    this.client.setProvider(
      sqlite.open(path.join(__dirname, 'data', 'databases', 'settings.sqlite3')).then(db => new SQLiteProvider(db))
    ).catch(console.error);

    this.client.registry
      .registerDefaultTypes()
      .registerDefaultGroups()
      .registerGroups([
        ['info', 'Informational commands']
      ])
      .registerDefaultCommands()
      .registerCommandsIn(path.join(__dirname, 'commands'));

    return this.client.login(this.token);
  }

  readyMessage () {
    return oneLine`Client ready at ${moment().format('HH:mm:ss')};
      logged in as ${this.client.user.username}#${this.client.user.discriminator} (${this.client.user.id})`;
  }
}

module.exports = DiscordBot;
