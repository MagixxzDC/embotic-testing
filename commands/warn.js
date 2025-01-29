const { EmbedBuilder } = require('discord.js');
const warnings = require('../warnings.json'); // Assuming warnings are stored in a JSON file
const fs = require('fs');

module.exports = {
    name: 'warn',
    aliases: ['warning', 'addwarn', 'balls'],
    description: 'Warn a player',
    async execute(message, args) {
        const target = message.mentions.users.first();
        const reason = args.slice(1).join(' ');

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You do not have permission to use this command.');
        }

        if (!target) {
            return message.reply('Please mention a valid user to warn.');
        }

        if (!reason) {
            return message.reply('Please provide a reason for the warning.');
        }

        if (!warnings[target.id]) {
            warnings[target.id] = [];
        }

        warnings[target.id].push({ reason, date: new Date() });
        console.log(`Warning added for ${target.tag}:`, warnings[target.id]); // Debugging line

        fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 2));

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Warning')
            .setDescription(`${target.tag} has been warned.`)
            .addFields({ name: 'Reason', value: reason })
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    },
};