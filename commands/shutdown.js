const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot',
    execute(message, args) {
        const authorizedUserId = '328248785933434881';
        const channelId = '814759943789215755';
        
        if (message.author.id !== authorizedUserId) {
            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Unauthorized')
                .setDescription('You are not authorized to use this command.');
            return message.channel.send({ embeds: [embed] });
        }

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Shutdown :skull:')
            .setDescription('Shutting down...');
        message.channel.send({ embeds: [embed] }).then(sentMessage => {
            setTimeout(() => {
                sentMessage.delete();
                const channel = message.guild.channels.cache.get(channelId);
                if (channel) {
                    channel.setName('OFFLINE :red_circle:').then(() => {
                        process.exit();
                    }).catch(err => {
                        const errorEmbed = new EmbedBuilder()
                            .setColor('#141414')
                            .setTitle('Error')
                            .setDescription(`Failed to rename the channel: ${err.message}`);
                        message.channel.send({ embeds: [errorEmbed] }).then(() => {
                            process.exit();
                        });
                    });
                } else {
                    const errorEmbed = new EmbedBuilder()
                        .setColor('#141414')
                        .setTitle('Error')
                        .setDescription('Channel not found');
                    message.channel.send({ embeds: [errorEmbed] }).then(() => {
                        process.exit();
                    });
                }
            }, 2000);
        });
    }
};
