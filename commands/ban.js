const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: ['b', 'banhammer', 'hammer', 'banish', 'begone', 'yeet'],
    description: 'Ban a user',
    async execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to use this command.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Please mention a user to ban.');
        }

        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('User not found.');
        }

        try {
            await member.ban();
            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('User Banned :hammer:')
                .setDescription(`**${user.tag}** has been banned by **${message.author.tag}**`)
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const errorembed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('There was an error trying to ban this user.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();
            message.channel.send({ embeds: [errorembed] });
        }
    },
};