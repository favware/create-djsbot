const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { oneLine } = require('common-tags');
const moment = require('moment');
const pkg = require('../../../package.json');
require('moment-duration-format');

module.exports = class StatsCommands extends Command {
  constructor (client) {
    super(client, {
      name: 'stats',
      aliases: ['statistics'],
      group: 'info',
      memberName: 'stats',
      description: 'Get the bot statistics',
      examples: ['stats'],
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run (msg) {
    const stats = new RichEmbed()
      .setColor(msg.guild ? msg.guild.me.displaHexColor : '#00FFFF')
      .setAuthor(`${this.client.user.username} Stats`, this.client.user.avatarURL)
      .addField('Guilds', this.client.guilds.size, true)
      .addField('Channels', this.client.channels.size, true)
      .addField('Users', this.client.users.size, true)
      .addField('Owner', this.client.owners[0].tag, true)
      .addField('License', pkg.version, true)
      .addField('DiscordJS', 'master', true)
      .addField('NodeJS', process.version, true)
      .addField('Platform', this.fetchPlatform(process.platform.toLowerCase()), true)
      .addField('Memory Usage', `${this.roundNumber(process.memoryUsage().heapUsed / 10485.76) / 100} MB`, true)
      .addField('Uptime', moment.duration(process.uptime() * 1000).format('D [days], H [hours] [and] m [minutes]'), true)
      .addField('Current server time', moment().format('MMMM Do YYYY [|] HH:mm.ss [UTC]ZZ'))
      .addField('\u200b', oneLine`
            Use the \`${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}
            help\` command to get the list of commands available to you in a DM.
            The default prefix is \`!\`. You can change this with the \`
            ${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}
            prefix\` command.
            If you ever forget the command prefix, just use \`${this.client.user.tag} prefix\``)
      .setFooter(`${pkg.name} | ${moment().format('MMMM Do YYYY [at] HH:mm:ss [UTC]Z')}`, this.client.user.avatarURL);

    return msg.embed(stats);
  }

  fetchPlatform (plat) {
    switch (plat) {
      case 'win32':
        return 'Windows';
      case 'darwin':
        return 'MacOS';
      default:
        return 'Linux';
    }
  }

  roundNumber (num, scale = 0) {
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
};
