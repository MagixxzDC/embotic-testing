const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const warnings = require('../warnings.json'); // Assuming warnings are stored in a JSON file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warns')
        .setDescription('Check warnings for a player')
        .addUserOption(option => option.setName('target').setDescription('The player to check warnings for').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        if (!target) {
            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Invalid User')
                .setDescription('Please mention a valid user to check warnings for.');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const userWarnings = warnings[target.id] || [];
        console.log(`Warnings for ${target.tag}:`, userWarnings); // Debugging line

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle(`Warnings for ${target.tag}`)
            .setDescription(userWarnings.length > 0 ? userWarnings.map((warn, index) => `**${index + 1}.** ${warn.reason} - ${new Date(warn.date).toLocaleString()}`).join('\n') : 'No warnings.');

        await interaction.reply({ embeds: [embed] });
    },
};