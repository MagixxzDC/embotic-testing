const { EmbedBuilder } = require('discord.js');
const warnings = require('../warnings.json'); // Assuming warnings are stored in a JSON file
const fs = require('fs');
const path = require('path');

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

        warnings[target.id].push({ reason, date: new Date(), channel: message.channel.id });
        console.log(`Warning added for ${target.tag}:`, warnings[target.id]); // Debugging line

        const warningsPath = path.join(__dirname, '../warnings.json');
        console.log('Writing to warnings.json at path:', warningsPath); // Debugging line
        try {
            fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));
            console.log('Successfully wrote to warnings.json'); // Debugging line
        } catch (error) {
            console.error('Error writing to warnings.json:', error);
            return message.reply('There was an error saving the warning. Please try again later.');
        }

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Warning')
            .setDescription(`${target.tag} has been warned.`)
            .addFields({ name: 'Reason', value: reason })
            .setTimestamp();

        const logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle(`User Warned in ${message.channel.name}`)
                .addFields(
                    { name: 'User:', value: `<@${target.id}>` },
                    { name: 'Reason:', value: reason },
                    { name: 'Moderator:', value: `<@${message.author.id}>` },
                    { name: 'Channel:', value: `<#${message.channel.id}>` }
                )
                .setTimestamp();
            await logChannel.send({ embeds: [logEmbed] });
        } else {
            console.log('Log channel not found.');
        }

        await message.channel.send({ embeds: [embed] });
    },
};