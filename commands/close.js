const { PermissionsBitField, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'close',
    aliases: ['end', 'finish', 'archive', 'transcript', 'save', 'exit'],
    description: 'Close the ticket and save a transcript',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('You do not have permission to use this command.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), 3000);
            });
        }

        if (message.channel.name.startsWith('ticket-')) {
            const messages = await message.channel.messages.fetch({ limit: 100 });
            const transcript = messages.map(msg => `${msg.author.tag}: ${msg.content}`).reverse().join('\n');

            const transcriptPath = path.join(__dirname, `transcript-${message.channel.name}.txt`);
            fs.writeFileSync(transcriptPath, transcript);

            const transcriptChannel = message.guild.channels.cache.find(channel => channel.name === 'ticket-transcripts');
            if (transcriptChannel) {
                await transcriptChannel.send({
                    files: [transcriptPath],
                    content: `Transcript for **#${message.channel.name}**`,
                });
            }

            await message.channel.delete().catch(console.error);
        } else {
            message.reply('This command can only be used in ticket channels.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), 3000);
            });
        }
    },
};
