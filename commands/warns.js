const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

let warnings;
try {
    warnings = require('../warnings.json'); // Assuming warnings are stored in a JSON file
} catch (error) {
    console.error('Error loading warnings.json:', error);
    warnings = {};
}

module.exports = {
    name: 'warns',
    aliases: ['warnings', 'checkwarns'],
    description: 'Check warnings for a player',
    async execute(message, args) {
        const target = message.mentions.users.first();

        if (!target) {
            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Invalid User')
                .setDescription('Please mention a valid user to check warnings for.');
            return message.reply({ embeds: [embed] });
        }

        const userWarnings = warnings[target.id] || [];
        console.log(`Warnings for ${target.tag}:`, userWarnings); // Debugging line

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle(`Warnings for ${target.tag}`)
            .setDescription(userWarnings.length > 0 ? userWarnings.map((warn, index) => `**${index + 1}.** ${warn.reason} - ${new Date(warn.date).toLocaleString()}`).join('\n') : 'No warnings.');

        await message.channel.send({ embeds: [embed] });

        const logChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle(`Warnings Checked for ${target.tag}`)
                .addFields(
                    { name: 'User:', value: `<@${target.id}>` },
                    { name: 'Moderator:', value: `<@${message.author.id}>` },
                    { name: 'Channel:', value: `<#${message.channel.id}>` }
                )
                .setTimestamp();
            await logChannel.send({ embeds: [logEmbed] });
        } else {
            console.log('Log channel not found.');
        }
    },
};