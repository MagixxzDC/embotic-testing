module.exports = {
    name: 'reboot',
    aliases: ['restart', 'reload'],
    description: 'Reboots the bot.',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You do not have permission to use this command.');
        }

        await message.channel.send('Rebooting...');

        process.exit();
    },
};