const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists all available **commands**.',
    async execute(message, args) {
        const commands = message.client.commands.reduce((uniqueCommands, command) => {
            if (!uniqueCommands.some(cmd => cmd.name === command.name)) {
                uniqueCommands.push({
                    name: command.name.length > 256 ? command.name.slice(0, 253) + '...' : command.name,
                    value: (command.description || 'No description available.').length > 1024 ? (command.description || 'No description available.').slice(0, 1021) + '...' : (command.description || 'No description available.')
                });
            }
            return uniqueCommands;
        }, []);

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
            .setTitle('Help <:util:1333637185869713489>')
            .setDescription('Here are all the available commands:')
            .addFields(fields)
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [helpEmbed] });
    },
};