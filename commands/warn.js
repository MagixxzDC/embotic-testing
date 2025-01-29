const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const warnings = require('../warnings.json'); // Assuming warnings are stored in a JSON file
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a player')
        .addUserOption(option => option.setName('target').setDescription('The player to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the warning').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Unauthorized')
                .setDescription('You do not have permission to use this command.');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!warnings[target.id]) {
            warnings[target.id] = [];
        }

        warnings[target.id].push({ reason, date: new Date() });

        fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 2));

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Warning')
            .setDescription(`${target.tag} has been warned.`)
            .addFields({ name: 'Reason', value: reason })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};