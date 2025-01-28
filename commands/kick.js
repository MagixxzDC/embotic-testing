const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You need to mention a user to kick.');
        }

        const member = message.guild.members.resolve(user);
        if (!member) {
            return message.reply('User not found.');
        }

        try {
            await member.kick();
            message.reply(`${user.tag} has been kicked.`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to kick this user.');
        }
    },
};
