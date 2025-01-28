const { PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Create a ticket for reporting issues',
    async execute(message, args) {
        const ticketChannel = await message.guild.channels.create({
            name: `ticket-${message.author.username}`, // Ensure the name field is set
            type: ChannelType.GuildText, // Use the correct constant for channel type
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: message.author.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                },
                {
                    id: message.guild.roles.everyone.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
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
