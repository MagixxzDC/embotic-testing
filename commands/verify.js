const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'verify',
    description: 'Assigns the Bot User role to the user.',
    async execute(message, args) {
        const role = message.guild.roles.cache.find(role => role.name === 'Bot User');
        if (!role) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('The Bot User role does not exist.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            return message.reply({ embeds: [errorEmbed] }).then(msg => {
                setTimeout(() => {
                    msg.delete().catch(console.error);
                    message.delete().catch(console.error);
                }, 5000);
            });
        }

        try {
            await message.member.roles.add(role);
            const successEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Success')
                .setDescription('You have been verified and assigned the Bot User role.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            message.reply({ embeds: [successEmbed] }).then(msg => {
                setTimeout(() => {
                    msg.delete().catch(console.error);
                    message.delete().catch(console.error);
                }, 5000);
            });

            // Log embed
            const logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor('#141414')
                    .setTitle(`${message.author.tag} was verified!`)
                    .setDescription(`Verified in: ${message.channel.name}\nWhen: ${new Date().toLocaleString()}`)
                    .setFooter({ text: 'Embotic • Magixxz#3038', iconURL: message.guild.iconURL() })
                    .setTimestamp();

                logChannel.send({ embeds: [logEmbed] });
            }
        } catch (error) {
            console.error('Error assigning role:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('There was an error assigning the Bot User role.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            message.reply({ embeds: [errorEmbed] }).then(msg => {
                setTimeout(() => {
                    msg.delete().catch(console.error);
                    message.delete().catch(console.error);
                }, 5000);
            });
        }
    },
};