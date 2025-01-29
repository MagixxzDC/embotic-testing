const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'shutdown',
    aliases: ['quit', 'stop', 'kill', 'off', 'PowerOff'],
    description: 'Shuts down the bot.',
    execute(message, args) {
        const authorizedUserId = '328248785933434881';
        const channelId = '814759943789215755';
        const secondChannelId = '838514683253620787'; // New channel ID
        
        if (message.author.id !== authorizedUserId) {
            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Unauthorized')
                .setDescription('You are not authorized to use this command.');
            return message.channel.send({ embeds: [embed] });
        }

        console.log('Authorized user. Proceeding with shutdown.');

        message.delete(); 

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Shutdown :skull:')
            .setDescription('Shutting down...');
        message.channel.send({ embeds: [embed] }).then(sentMessage => {
            setTimeout(() => {
                sentMessage.delete();
                const channel = message.guild.channels.cache.get(channelId);
                const secondChannel = message.guild.channels.cache.get(secondChannelId); // Get the second channel
                
                if (channel && secondChannel) {
                    console.log('Both channels found. Renaming channels.');
                    Promise.all([
                        channel.setName('Offline 🔴'),
                        secondChannel.setName('🕒 | Offline')
                    ]).then(() => {
                        console.log('Channels renamed successfully. Shutting down.');
                        process.exit();
                    }).catch(err => {
                        console.error(`Failed to rename the channels: ${err.message}`);
                        const errorEmbed = new EmbedBuilder()
                            .setColor('#141414')
                            .setTitle('Error')
                            .setDescription(`Failed to rename the channels: ${err.message}`);
                        message.channel.send({ embeds: [errorEmbed] }).then(() => {
                            process.exit();
                        });
                    });
                } else {
                    console.error('One or both channels not found.');
                    const errorEmbed = new EmbedBuilder()
                        .setColor('#141414')
                        .setTitle('Error')
                        .setDescription('One or both channels not found');
                    message.channel.send({ embeds: [errorEmbed] }).then(() => {
                        process.exit();
                    });
                }
            }, 2000);
        });
    }
};
