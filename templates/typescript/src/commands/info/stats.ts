
/**
 * This is a sample command that shows the stats of the discord bot
 * It uses a MessageEmbed to show it in a really nice format
 */
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { MessageEmbed, version } from 'discord.js';
import { oneLine } from 'common-tags';
import moment from 'moment';
import 'moment-duration-format';

export default class StatsCommands extends Command {
  /**
     * Initializing this command. You configure the command options here.
     * @param {CommandoClient} client The client that the command is for. You should never edit this!
     */
  constructor(client: CommandoClient) {
    super(client, {
      name: 'stats',
      aliases: [ 'statistics' ],
      group: 'info',
      memberName: 'stats',
      description: 'Get the bot statistics',
      examples: [ 'stats' ],
      throttling: {
        usages: 2,
        duration: 3,
      },
    });
  }

  /**
     * Commando requires a "run" function that is what is run when the command is called
     */
  public run(msg: CommandoMessage) {
    // Initialize a new MessageEmbed
    const stats = new MessageEmbed()
    // Set the color to either the bot role color or Cyan
      .setColor(msg.guild ? msg.guild.me!.displayHexColor : '#00FFFF')
    // Set the author to the bot username and assign the bot avatar
      .setAuthor(`${this.client.user!.username} Stats`, this.client.user!.displayAvatarURL())
    // The amount of guilds the bot is in
      .addField('Guilds', this.client.guilds.size, true)
    // The amount of channels the bot has access to
      .addField('Channels', this.client.channels.size, true)
    // The amount of users the bot can see
      .addField('Users', this.client.users.size, true)
    // The tag of the first owner of the bot
      .addField('Owner', this.client.owners[0].tag, true)
    // The license of the bot
      .addField('License', '{{license}}', true)
    // The DiscordJS version used by the bot
      .addField('DiscordJS', version, true)
    // The NodeJS version used by the bot
      .addField('NodeJS', process.version, true)
    // The platform the bot is running on (Windows, MacOS or Linux)
      .addField('Platform', this.fetchPlatform(process.platform.toLowerCase()), true)
    // The amount of RAM the bot is using
      .addField('Memory Usage', `${this.roundNumber(process.memoryUsage().heapUsed / 10485.76) / 100} MB`, true)
    // The total process uptime of the bot
      .addField('Uptime', moment.duration(process.uptime() * 1000).format('D [days], H [hours] [and] m [minutes]'), true)
    // The current time on the server where the bot is running
      .addField('Current server time', moment().format('MMMM Do YYYY [|] HH:mm.ss [UTC]ZZ'))
    // Some general information about the bot such as the prefix
      .addField('\u200b', oneLine`
            Use the \`${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}
            help\` command to get the list of commands available to you in a DM.
            The default prefix is \`!\`. You can change this with the \`
            ${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}
            prefix\` command.
            If you ever forget the command prefix, just use \`${this.client.user!.tag} prefix\``)
    // And finally a footer for the embed
      .setFooter(`{{name}} | ${moment().format('MMMM Do YYYY [at] HH:mm:ss [UTC]Z')}`, this.client.user!.displayAvatarURL());

    // Send the embed
    return msg.embed(stats);
  }

  // Helper function to parse the platform
  public fetchPlatform(plat: 'win32' | 'darwin' | string) {
    switch (plat) {
      case 'win32':
        return 'Windows';
      case 'darwin':
        return 'MacOS';
      default:
        return 'Linux';
    }
  }

  // Helper function to round any number efficiently and properly
  public roundNumber(num: number, scale = 0) {
    if (!num.toString().includes('e')) {
      return Number(`${Math.round(Number(`${num}e+${scale}`))}e-${scale}`);
    }
    const arr = `${num}`.split('e');
    let sig = '';

    if (Number(arr[1]) + scale > 0) {
      sig = '+';
    }

    return Number(`${Math.round(Number(`${Number(arr[0])}e${sig}${Number(arr[1]) + scale}`))}e-${scale}`);
  }
}