module.exports = {
    name: 'report',
    description: 'Create a ticket for reporting issues',
    async execute(message, args) {
        const ticketChannel = await message.guild.channels.create(`ticket-${message.author.username}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                },
                {
                    id: message.guild.roles.everyone.id,
                    deny: ['VIEW_CHANNEL'],
                },
            ],
        });

        const embed = {
            color: '#141414',
            title: 'Ticket Created',
            description: 'Please describe your issue in detail. A staff member will be with you shortly.',
            timestamp: new Date(),
            footer: {
                text: 'Thank you for your patience.',
            },
        };

        await ticketChannel.send({ embeds: [embed] });
        await message.reply(`Your ticket has been created: ${ticketChannel}`);
    },
};
