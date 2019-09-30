/**
 * This is a sample command that shows the info of any discord member of a server
 * It uses a MessageEmbed to show it in a really nice format
 */
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { GuildMember, MessageEmbed } from 'discord.js';
import moment from 'moment';

interface UserInfoArgs {
  member: GuildMember;
}

/**
 * Helper function that goes through any array and removes the given value
 * This is used to remove the "@everyone" role for this command
 * @param {string} deleteValue Value to remove from the array
 * @param {array} array The array to check
 */
const removeNullAndUndefined = <TValue>(value: TValue | null | undefined): value is TValue => {
  return value !== null && value !== undefined;
};

export default class UserInfoCommand extends Command {
  /**
   * Initializing this command. You configure the command options here.
   * @param {CommandoClient} client The client that the command is for. You should never edit this!
   */
  constructor(client: CommandoClient) {
    super(client, {
      name: 'userinfo',
      aliases: [ 'user', 'uinfo' ],
      group: 'info',
      memberName: 'userinfo',
      description: 'Gets information about a user.',
      format: 'MemberID|MemberName(partial or full)',
      examples: [ 'userinfo Favna' ],
      // Here we specify that this command can only be used in servers, so not in DMs. For this command
      // We need this since we access information only available on a server member
      guildOnly: true,
      // Here we define a very mild throttling to prevent users absolutely spamming the command
      throttling: {
        usages: 2,
        duration: 3,
      },
      /**
       * Here we define the arguments this command can take.
       * In this case we have 1 argument with the key of "member" and the type is also "member"
       * "member" type is given to you by the Commando framework and matches your input to any
       * GuildMember automagically!
       * Furthermore it always defaults to the user that used the command.
       */
      args: [
        {
          key: 'member',
          prompt: 'Which member would you like to snoop on?',
          type: 'member',
          default: (msg: CommandoMessage) => msg.member,
        }
      ],
    });
  }

  /**
     * Commando requires a "run" function that is what is run when the command is called
     * @param {CommandoMessage} msg The message that this command is run from (your message)
     * @param {GuildMember} member The second param is normally all the "args",
     *                             but you can directly import just your specified args by { wrapping it in curly braces}
     *                             This is a nice shortcut to access your arguments but you have to be careful that what you
     *                             write here matches the argument keys above!
     */
  public run(msg: CommandoMessage, { member }: UserInfoArgs) {
    // Initializes a new MessageEmbed
    const uinfoEmbed = new MessageEmbed()
      // The author is set to the tag of the member
      .setAuthor(member.user.tag)
      // The thumbnail is set to their avatar
      .setThumbnail(member.user.displayAvatarURL())
      // The color is set to their role's color
      .setColor(member.displayHexColor)
      // Add a field that shows the user's ID
      .addField('Name', member.user.username, true)
      // Add a field that shows their nickname, if any
      .addField('Nickname', member.nickname ? member.nickname : 'No Nickname', true)
      // Add a field that shows their current status
      .addField(
        'Status',
        member.user.presence.status !== 'dnd' ? this.transformToSentenceCase(member.user.presence.status) : 'Do Not Disturb',
        true
      )
      // Add a field that shows their current activity
      .addField(
        member.user.presence.activity ? this.transformToSentenceCase(member.user.presence.activity.type) : 'Activity',
        member.user.presence.activity ? member.user.presence.activity.name : 'Nothing',
        true
      )
      // Add a field that shows the hexadecimal representation of the user's role color
      .addField('Display Color', member.displayHexColor, true)
      // Add a field that shows the user's role, except the "everyone" role which everyone has
      .addField('Role(s)',
        member.roles.size > 1
          ? member.roles
            .map(r => r.name)
            .filter(name => name !== '@everyone')
            .filter(removeNullAndUndefined)
            .join(' | ')
          : 'None'
      )
      // Add a field that shows when the user created their account
      .addField('Account created at', moment(member.user.createdAt).format('MMMM Do YYYY [at] HH:mm:ss [UTC]Z'), true)
      // Add a field that shows when the user joined the server
      .addField('Joined server at', moment(member.joinedAt!).format('MMMM Do YYYY [at] HH:mm:ss [UTC]Z'), true);

    // If the user has 1 or more roles it shows that amount, or otherwise that they have 0 roles. Again @everyone is not counted.
    if (member.roles.size >= 1) {
      uinfoEmbed.setFooter(`${member.displayName} has ${member.roles.size - 1} role(s)`);
    } else {
      uinfoEmbed.setFooter(`${member.displayName} has 0 roles`);
    }

    return msg.embed(uinfoEmbed);
  }

  /**
   * Helper function that transform any bit of text ot sentence case.
   * That means sentences like these that start with a capital letter but are small case for the rest of them.
   * @param {string} str The text to convert to sentence case
   */
  private transformToSentenceCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}