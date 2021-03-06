const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { production, prefix, devPrefix } = require('../../config');
const emotes = require('../../../lib/constants').emotes

class PermissionsCommand extends Command {
    constructor() {
        super('permissions', {
           aliases: ['permissions', 'perms'],
           category: 'Miscellaneous',
           description: {
               content: 'Information about what permissions Rada requires.',
               permissions: ['EMBED_LINKS']
           }
        });
    }

    async exec(message) {
      const embed = new MessageEmbed()
        .setColor(this.client.color)
        .setTitle(`${this.client.user.username} permission breakdown`)
        .setThumbnail(this.client.avatar)
        .setDescription(`${emotes.info} You can view the permissions that a command requires by running \`${this.client.settings.get(this.client.user.id, 'prefix', production ? prefix : devPrefix)}help <command>\`. If there is no Permissions field, that means it doesn\'t require any extra permissions`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp()
      return message.util.send(embed);
    }
}

module.exports = PermissionsCommand;