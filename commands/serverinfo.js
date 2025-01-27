const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    aliases: ['server', 'sinfo', 'guildinfo'],
    description: 'Displays information about the server.',
    async execute(message, args) {
        const { guild } = message;
        const owner = await guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Server Information :computer:')
            .setDescription(`This is all the information available on ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Server Name', value: guild.name, inline: true },
                { name: 'Server ID', value: guild.id, inline: true },
                { name: 'Owner', value: `${owner.user.tag}`, inline: true },
                { name: 'Owner ID', value: owner.id, inline: true },
                { name: 'Created On', value: guild.createdAt.toDateString(), inline: true },
                { name: 'Days Since Creation', value: `${Math.floor((Date.now() - guild.createdAt) / (1000 * 60 * 60 * 24))}`, inline: true },
                { name: 'Region', value: guild.region, inline: true },
                { name: 'Verification Level', value: guild.verificationLevel, inline: true },
                { name: 'Text Channels', value: `${guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size}`, inline: true },
                { name: 'Voice Channels', value: `${guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size}`, inline: true },
                { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true }
            )
            .setFooter({ text: 'Embotic', iconURL: guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};