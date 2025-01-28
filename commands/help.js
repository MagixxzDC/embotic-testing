const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists all available commands.',
    async execute(message, args) {
        const commands = message.client.commands.map(command => ({
            name: command.name,
            value: command.description || 'No description available.'
        }));

        const helpEmbed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Help :information_source:')
            .setDescription('Here are all the available commands:')
            .addFields(commands)
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [helpEmbed] });
    },
};