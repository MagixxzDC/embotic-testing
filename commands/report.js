const { PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Create a ticket for reporting issues',
    async execute(message, args) {
        if (message.channel.name !== 'reports') {
            message.reply('This command can only be used in the <#' + message.guild.channels.cache.find(channel => channel.name === 'reports').id + '> channel.').then(msg => {
                setTimeout(() => msg.delete().catch(console.error), 3000);
            });
            return setTimeout(() => message.delete().catch(console.error), 3000);
        }

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
            color: 0x1e1e1e, // Use a valid integer value for color
            title: 'Ticket Created',
            description: 'Please describe your issue in detail. A staff member will be with you shortly.',
            timestamp: new Date(),
            footer: {
                text: 'Thank you for your patience.',
            },
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL({ dynamic: true }),
            },
        };

        await ticketChannel.send({ embeds: [embed] });
        const responseMessage = await message.reply(`Your ticket has been created: ${ticketChannel}`);

        // Delete the user's message and response message after 3 seconds
        setTimeout(() => {
            message.delete().catch(console.error);
            responseMessage.delete().catch(console.error);
        }, 3000);

        // Send an embed to #open-tickets
        const logChannel = message.guild.channels.cache.find(channel => channel.name === 'open-tickets');
        if (logChannel) {
            const logEmbed = {
                color: 0x1e1e1e,
                title: 'New Ticket Created',
                description: `A new ticket has been created by ${message.author.tag} in ${ticketChannel}.`,
                timestamp: new Date(),
                footer: {
                    text: 'Embotic Ticket System',
                },
                author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                },
            };
            await logChannel.send({ embeds: [logEmbed] });
        }
    },
};
