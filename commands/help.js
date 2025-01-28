const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists all available commands.',
    async execute(message, args) {
        const commands = message.client.commands.map(command => `\`${command.name}\`: ${command.description}`).join('\n');
        
        const helpEmbed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Help :information_source:')
            .setDescription('Here are all the available commands:')
            .addFields({ name: 'Commands', value: commands })
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [helpEmbed] });
    },
};