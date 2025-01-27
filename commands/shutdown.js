const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot',
    execute(message, args) {
        const authorizedUserId = '328248785933434881';
        
        if (message.author.id !== authorizedUserId) {
            const embed = new MessageEmbed()
                .setColor('#141414')
                .setTitle('Unauthorized')
                .setDescription('You are not authorized to use this command.');
            return message.channel.send({ embeds: [embed] });
        }

        const embed = new MessageEmbed()
            .setColor('#141414')
            .setTitle('Shutdown')
            .setDescription('Shutting down...');
        message.channel.send({ embeds: [embed] }).then(() => {
            process.exit();
        });
    }
};
