const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Displays the avatar of the mentioned user or the command user.',
    execute(message, args) {
        let user = message.mentions.users.first() || message.author;
        let avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        const avatarEmbed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle(`${user.username}'s Avatar`)
            .setImage(avatarURL)
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [avatarEmbed] });
    },
};