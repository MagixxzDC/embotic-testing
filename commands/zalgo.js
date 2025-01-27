const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('zalgo')
        .setDescription('Converts your text into Zalgo text.')
        .addStringOption(option => 
            option.setName('text')
                .setDescription('The text to convert to Zalgo.')
                .setRequired(true)),
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const text = interaction.options.getString('text');
        const zalgoText = toZalgo(text);
        await interaction.reply(zalgoText);
    },
};

function toZalgo(text) {
    const zalgoChars = '̴̵̶̸̷̡̢̧̨̛̖̗̘̙̜̝̞̟̠̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎͓͔͕͖͙͚̣̍̎̄̅̿̑̆̐͒͗͑̇̈̊͂̓̈͊͋͌̃̂̌͐̀́̋̏̒̓̔̽̉ͣͤͥͦͧͨͩͪͫͬͭͮͯ̾͛͆̀́̚̕͘͜͟͢͝͞͠͡ͅ҉';

    return text.split('').map(char => {
        if (char === ' ') return char;
        let newChar = char;
        for (let i = 0; i < 5; i++) {
            newChar += zalgoChars[Math.floor(Math.random() * zalgoChars.length)];
        }
        return newChar;
    }).join('');
}