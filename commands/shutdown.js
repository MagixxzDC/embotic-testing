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

        setTimeout(() => {
            const channel = message.guild.channels.cache.get(channelId);
            const secondChannel = message.guild.channels.cache.get(secondChannelId); // Get the second channel
            
            if (channel && secondChannel) {
                console.log('Both channels found. Renaming channels.');
                Promise.all([
                    channel.setName('Offline 🔴'),
                    secondChannel.setName('🕒 | Offline')
                ]).then(() => {
                    console.log('Channels renamed successfully. Shutting down.');
                    process.exit(0);
                }).catch(err => {
                    if (err.code === 50013) { // Missing Permissions
                        console.error('Missing permissions to rename the channels.');
                    } else if (err.code === 50035) { // Invalid Form Body
                        console.error('Invalid form body when renaming the channels.');
                    } else if (err.code === 10003) { // Unknown Channel
                        console.error('One or both channels not found.');
                    } else {
                        console.error(`Failed to rename the channels: ${err.message}`);
                    }
                    const errorEmbed = new EmbedBuilder()
                        .setColor('#141414')
                        .setTitle('Error')
                        .setDescription(`Failed to rename the channels: ${err.message}`);
                    message.channel.send({ embeds: [errorEmbed] }).then(() => {
                        process.exit(1);
                    });
                });
            } else {
                console.error('One or both channels not found.');
                const errorEmbed = new EmbedBuilder()
                    .setColor('#141414')
                    .setTitle('Error')
                    .setDescription('One or both channels not found');
                message.channel.send({ embeds: [errorEmbed] }).then(() => {
                    process.exit(1);
                });
            }
        }, 2000);
    }
};
