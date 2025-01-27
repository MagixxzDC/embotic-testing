const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'suggest',
    aliases: ['suggestion', 'feedback'],
    description: 'Submit a suggestion.',
    async execute(message, args) {
        const suggestionChannelId = '1333566583875965019'; 
        const suggestionChannel = message.guild.channels.cache.get(suggestionChannelId);

        if (!suggestionChannel) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('Suggestion channel not found.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            return message.reply({ embeds: [errorEmbed] }).then(msg => {
                msg.delete();
            });
        }

        const suggestion = args.join(' ');
        if (!suggestion) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('Please provide a suggestion.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            return message.reply({ embeds: [errorEmbed] }).then(msg => {
                msg.delete();
            });
        }

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('New Suggestion')
            .setDescription(suggestion)
            .addFields(
                { name: 'Suggested by', value: message.author.tag, inline: true },
                { name: 'User ID', value: message.author.id, inline: true }
            )
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        try {
            const botMessage = await suggestionChannel.send({ embeds: [embed] });
            const replyMessage = await message.reply('Thank you for your suggestion!');
            
            message.delete().catch(console.error);
            replyMessage.delete().catch(console.error);
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('There was an error trying to submit your suggestion.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            message.reply({ embeds: [errorEmbed] }).then(msg => {
                msg.delete();
            });
        }
    },
};