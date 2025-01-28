const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const embed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('Permission Denied')
                .setDescription('You do not have permission to use this command.')
                .setTimestamp()
                .setFooter({ text: 'Check your permissions and try again.' });
            return message.reply({ embeds: [embed] });
        }

        const user = message.mentions.users.first();
        if (!user) {
            const embed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('User Not Mentioned')
                .setDescription('You need to mention a user to kick.')
                .setTimestamp()
                .setFooter({ text: 'Mention a user and try again.' });
            return message.reply({ embeds: [embed] });
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            const embed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('User Not Found')
                .setDescription('User not found.')
                .setTimestamp()
                .setFooter({ text: 'Ensure the user is in the server and try again.' });
            return message.reply({ embeds: [embed] });
        }

        try {
            await member.kick();
            const embed = new EmbedBuilder()
                .setColor(0x00ff00)
                .setTitle('User Kicked')
                .setDescription(`${user.tag} has been kicked.`)
                .setTimestamp()
                .setFooter({ text: 'User has been successfully kicked.' });
            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const embed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('Error')
                .setDescription('There was an error trying to kick this user.')
                .setTimestamp()
                .setFooter({ text: 'Please try again later.' });
            message.reply({ embeds: [embed] });
        }
    },
};
