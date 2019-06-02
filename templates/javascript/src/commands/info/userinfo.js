const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class UserInfoCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'userinfo',
      aliases: ['user', 'uinfo'],
      group: 'info',
      memberName: 'userinfo',
      description: 'Gets information about a user.',
      format: 'MemberID|MemberName(partial or full)',
      examples: ['userinfo Favna'],
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 3
      },
      args: [
        {
          key: 'member',
          prompt: 'Which member would you like to snoop on?',
          type: 'member',
          default: (msg) => msg.member
        }
      ]
    });
  }

  run (msg, { member }) {
    console.log(member.user.presence);
    const uinfoEmbed = new RichEmbed()
      .setAuthor(member.user.tag)
      .setThumbnail(member.user.avatarURL)
      .setColor(member.displayHexColor)
      .addField('ID', member.id, true)
      .addField('Name', member.user.username, true)
      .addField('Nickname', member.nickname ? member.nickname : 'No Nickname', true)
      .addField(
        'Status',
        member.user.presence.status !== 'dnd' ? this.sentencecase(member.user.presence.status) : 'Do Not Disturb',
        true
      )
      .addField(
        member.user.presence.game ? 'Playing' : 'Activity',
        member.user.presence.game ? member.user.presence.game.name : 'Nothing',
        true
      )
      .addField('Display Color', member.displayHexColor, true)
      .addField(
        'Role(s)',
        member.roles.size > 1 ? this.cleanArray(null, member.roles.map(r => r.name).filter(name => name !== '@everyone')).join(' | ') : 'None'
      )
      .addField('Account created at', moment(member.user.createdAt).format('MMMM Do YYYY [at] HH:mm:ss [UTC]Z'), true)
      .addField('Joined server at', moment(member.joinedAt).format('MMMM Do YYYY [at] HH:mm:ss [UTC]Z'), true);

    member.roles.size >= 1
      ? uinfoEmbed.setFooter(`${member.displayName} has ${member.roles.size - 1} role(s)`)
      : uinfoEmbed.setFooter(`${member.displayName} has 0 roles`);

    return msg.embed(uinfoEmbed);
  }

  sentencecase (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  cleanArray (deleteValue, array) {
    return array.filter(element => element !== deleteValue);
  }
};
