const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'purge',
    aliases: ['clear', 'clean', 'delete', 'd', 'p'],
    description: 'Deletes a specified number of messages from a channel.',
    async execute(message, args) {
        // Check if the user has the required permissions
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Unauthorized')
                .setDescription('You do not have permission to use this command.');
            return message.channel.send({ embeds: [embed] });
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1 || amount > 100) {
            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Invalid Amount')
                .setDescription('Please provide a number between 1 and 100.');
            return message.channel.send({ embeds: [embed] });
        }

        try {
            const fetched = await message.channel.messages.fetch({ limit: amount });
            const filtered = fetched.filter(msg => (Date.now() - msg.createdTimestamp) < 14 * 24 * 60 * 60 * 1000);
            await message.channel.bulkDelete(filtered);

            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Purge Successful')
                .setDescription(`Successfully deleted ${filtered.size} messages.`)
                .setFooter({ text: 'Embotic', iconURL: message.client.user.displayAvatarURL() })
                .setTimestamp();

            const confirmationMessage = await message.channel.send({ embeds: [embed] });

            setTimeout(async () => {
                try {
                    if (confirmationMessage.channel) {
                        await confirmationMessage.delete();
                    }
                } catch (error) {
                    console.error('Error deleting confirmation message:', error);
                }
            }, 5000);
        } catch (error) {
            console.error('Error purging messages:', error);
            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('There was an error trying to purge messages.');
            message.channel.send({ embeds: [embed] });
        }
    },
};