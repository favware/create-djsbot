/**
 * This file is ES6 TypeScript Class and splits off all the bot initializing logic
 * from the main app file.
 * Splitting this off is a good practice as it means your bot configuration
 * is not jumbled up with the app initiation.
 */

import { CommandoClient, SQLiteProvider, CommandoClientOptions } from 'discord.js-commando';
import { oneLine } from 'common-tags';
import { open as openDb } from 'sqlite';
import moment from 'moment';
import path from 'path';
import log from './utils/winston';

export default class Discordbot extends CommandoClient {
  /**
   * Constructor for the Discord Bot. Sets the token to the class as well as
   * created the client with the given prefix and owner ID. You can put
   * a lot more configuration here, view the Discord.JS-Commando docs
   * on CommandoClient here: {@link https://discord.js.org/#/docs/commando/djs-v11/class/CommandoClient}
   */
  constructor(options: CommandoClientOptions = {}) {
    super({
      ...options,
      commandPrefix: '{{prefix}}',
      owner: [ '{{ownerid}}' ],
      typescript: true,
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
   * The "init" function has to be public!
   */
  public async init(token: string) {
    this
      // Logs errors
      .on('error', (err: Error) => log.error(err))
      // Logs when the bot is ready
      .on('ready', () => log.info(this.readyMessage()))
      // Logs warnings
      .on('warn', (warning: string) => log.warn(warning));

    // Ensures the bot doesn't crash when it runs into an unhandled rejection, an otherwise process crashing NodeJS exception
    process.on('unhandledRejection', (reason: Error | any) => log.error(reason));

    const database = await openDb(path.join(__dirname, 'data/databases/settings.sqlite'));

    this.setProvider(new SQLiteProvider(database));

    this.registry
      // Register the types given by Commando
      .registerDefaultTypes()
      // Register the default command groups given by Commando
      .registerDefaultGroups()
      // Register the default commands given by Commando (help, eval, ping etc.)
      .registerDefaultCommands()
      // Register our own command groups
      .registerGroups([
        [ 'info', 'Informational commands' ]
      ])
      // Register our own commands and makes sure it scans for ".ts" and ".js" files
      .registerCommandsIn({
        dirname: path.join(__dirname, 'commands'),
        filter: (fileName: string) => /^.+\.(j|t)s$/.test(fileName) ? fileName : undefined,
      });

    // Login the bot
    return this.login(token);
  }

  /**
   * Side effect method used by the client.on('ready') event to log that
   * the bot is online, as well as its username, discriminator and ID.
   * It is marked as private as it only ever used in this class.
   */
  private readyMessage() {
    return oneLine`Client ready at ${moment().format('HH:mm:ss')};
        logged in as ${this.user!.tag} (${this.user!.id})`;
  }
}