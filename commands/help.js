const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists all available commands.',
    async execute(message, args) {
        const commands = message.client.commands.filter(command => !command.aliases).map(command => ({
            name: command.name.length > 256 ? command.name.slice(0, 253) + '...' : command.name,
            value: (command.description || 'No description available.').length > 1024 ? (command.description || 'No description available.').slice(0, 1021) + '...' : (command.description || 'No description available.')
        }));

        const fields = [];
        let totalLength = 0;
        for (const command of commands) {
            const fieldLength = command.name.length + command.value.length;
            if (totalLength + fieldLength > 6000) break; // Discord's total embed length limit is 6000 characters
            fields.push(command);
            totalLength += fieldLength;
        }

        const helpEmbed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Help :information_source:')
            .setDescription('Here are all the available commands:')
            .addFields(fields)
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [helpEmbed] });
    },
};