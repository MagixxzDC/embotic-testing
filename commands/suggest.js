const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'suggest',
    aliases: ['suggestion', 'feedback'],
    description: 'Submit a suggestion.',
    async execute(message, args) {
        const suggestionChannelId = '758365398587408386'; 
        const suggestionSubmissionChannelId = '1333566583875965019'; 
        const suggestionChannel = message.guild.channels.cache.get(suggestionChannelId);
        const suggestionSubmissionChannel = message.guild.channels.cache.get(suggestionSubmissionChannelId);

        if (message.channel.id !== suggestionChannelId) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('You can only use this command in the #suggestions channel.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            return message.reply({ embeds: [errorEmbed] }).then(msg => {
                setTimeout(() => msg.delete(), 0);
                setTimeout(() => message.delete(), 0);
            });
        }

        if (!suggestionSubmissionChannel) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('Suggestion submission channel not found.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            return message.reply({ embeds: [errorEmbed] }).then(msg => {
                setTimeout(() => msg.delete(), 0);
                setTimeout(() => message.delete(), 0);
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
                setTimeout(() => msg.delete(), 0);
                setTimeout(() => message.delete(), 0);
            });
        }

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('New Suggestion :exclamation:')
            .setDescription(suggestion)
            .addFields(
                { name: 'Suggested by', value: message.author.tag, inline: true },
                { name: 'User ID', value: message.author.id, inline: true }
            )
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        try {
            const botMessage = await suggestionSubmissionChannel.send({ embeds: [embed] });
            const replyMessage = await message.reply('Thank you for your suggestion!');
            
            setTimeout(() => message.delete().catch(console.error), 0);
            setTimeout(() => replyMessage.delete().catch(console.error), 5000); // Changed to 5 seconds
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('There was an error trying to submit your suggestion.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            message.reply({ embeds: [errorEmbed] }).then(msg => {
                setTimeout(() => msg.delete(), 0);
                setTimeout(() => message.delete(), 0);
            });
        }
    },
};