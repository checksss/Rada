const { Command } = require('discord-akairo');

module.exports = class KickCommand extends Command {
    constructor() {
      super('warn', {
        aliases: ['warn'],
        category: 'Moderation',
        description: {
            content: 'Warn a user breaking the rules.',
            permissions: ['KICK_MEMBERS']
        },
        args: [{
          id: 'member',
          type: 'member',
          default: null
        }, {
          id: 'reason',
          type: 'string',
          match: 'rest',
          default: null
        }],
      });
    }
    userPermissions(message) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.responder.error('**You require the kick members permission to use this command**');
        }
        return null;
    }
    clientPermissions(message) {
        if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
            return message.responder.error('**I require the kick members permission to use this command**');
        }
        return null;
    }

    async exec(message, args) {
        if (!args.member) {
            return message.responder.error('**Please provide a valid user to warn**');
        }
        if (!args.reason) {
            return message.responder.error('**Please provide a reason for the warning**');
        }
        if (args.member.id === message.author.id) {
            return message.responder.error('**You cannot warn yourself**');
        }
        if (message.member.roles.highest.comparePositionTo(args.member.roles.highest) <= 0) {
            return message.responder.error(`**You are unable to warn ${args.member.user.tag}**: \`Higher role\``);
        }
        args.member.settings.updateInfraction('punishments.warn', message.author, args.reason);
        return message.responder.success(`**Warned \`${args.member.user.tag} (${args.member.id})\`**`);

        // if (logs) {
        //     return logs.send({
        //         embed: new MessageEmbed()
        //             .setColor(this.client.embedColor())
        //             .setTitle(`Moderation action - **Ban**`)
        //             .setDescription(`**${member.tag}** Has been banned from the server\nModerator: \`${message.author.tag}\`\nBan reason: \`\"${reason}\"\``)
        //     });
        // };
    }
}