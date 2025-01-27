const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'echo',
    aliases: ['repeat', 'say'],
    description: 'Echoes the user\'s message.',
    async execute(message, args) {
        const text = args.join(' ');
        if (!text) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('Please provide a message to echo.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            return message.reply({ embeds: [errorEmbed] }).then(msg => {
                msg.delete();
            });
        }
        message.channel.send(text);
    },
};
