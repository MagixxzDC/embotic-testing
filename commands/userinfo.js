const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    aliases: ['user', 'uinfo', 'whois', 'info','doxx'],
    description: 'Displays information about a user.',
    async execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('User Information :personembotic:')
            .setDescription(`This is all the information available on ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Tag', value: user.tag, inline: true },
                { name: 'Bot?', value: user.bot ? 'Yes, a bot.' : 'Not a bot.', inline: true },
                { name: 'Nickname', value: member.nickname ? member.nickname : 'No Nickname Found.', inline: true },
                { name: 'Joined Server', value: member.joinedAt.toLocaleDateString(), inline: true },
                { name: 'Joined Discord', value: user.createdAt.toLocaleDateString(), inline: true },
                { name: 'Role Amount', value: member.roles.cache.size.toString(), inline: true },
                { name: 'ID', value: user.id, inline: true }
            )
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};