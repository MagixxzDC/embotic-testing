const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'staff',
    description: 'Lists all staff members.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('You do not have permission to use this command.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            return message.reply({ embeds: [errorEmbed] });
        }

        const staffRoles = ['Bot Owner', 'Administrator', 'Moderator']; // Add your staff roles here
        let staffMembers = [];

        staffRoles.forEach(roleName => {
            const role = message.guild.roles.cache.find(r => r.name === roleName);
            if (role) {
                staffMembers.push(`**__${roleName}__**`); // Add header for each role
                role.members.forEach(member => {
                    staffMembers.push(`${member.user.tag}`);
                });
            }
        });

        if (staffMembers.length === 0) {
            return message.reply('No staff members found.');
        }

        const staffEmbed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Staff Members')
            .setDescription(staffMembers.join('\n'))
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [staffEmbed] });
    }
};