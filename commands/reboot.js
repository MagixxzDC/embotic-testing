const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'reboot',
    aliases: ['restart', 'reload'],
    description: 'Reboots the bot.',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You do not have permission to use this command.');
        }

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Rebooting')
            .setDescription('The bot is rebooting...')
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });

        process.exit();
    },
};