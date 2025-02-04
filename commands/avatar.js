const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp', 'a'],
    description: 'Displays the avatar of the mentioned user or the command user. If a role is mentioned, displays avatars of all users with that role.',
    execute(message, args) {
        let users = [];
        if (message.mentions.roles.size > 0) {
            let role = message.mentions.roles.first();
            users = role.members.map(member => member.user);
        } else if (message.mentions.users.size > 0) {
            users.push(message.mentions.users.first());
        } else {
            users.push(message.author);
        }

        if (users.length === 0) {
            return message.channel.send('No users found.');
        }

        users.forEach(user => {
            let avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

            const avatarEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle(`${user.username}'s Avatar`)
                .setImage(avatarURL)
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            message.channel.send({ embeds: [avatarEmbed] });
        });
    },
};