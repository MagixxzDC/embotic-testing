const { CommandInteraction, Client, ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'zalgo',
    description: 'Converts your text into Zalgo text.',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'text',
            description: 'The text to convert to Zalgo.',
            type: 3, // STRING type
            required: true,
        },
    ],
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
    const zalgoChars = {
        up: [
            '̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͂', '̓', '̈', '͊', '͋', '͌', '̃', '̂', '̌', '͐', '̀', '́', '̋', '̏', '̒', '̓', '̔', '̽', '̉', 'ͣ', 'ͤ', 'ͥ', 'ͦ', 'ͧ', 'ͨ', 'ͩ', 'ͪ', 'ͫ', 'ͬ', 'ͭ', 'ͮ', 'ͯ', '̾', '͛', '͆', '̚',
        ],
        down: [
            '̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̹', '̺', '̻', '̼', 'ͅ', '͇', '͈', '͉', '͍', '͎', '͓', '͔', '͕', '͖', '͙', '͚', '̣',
        ],
        mid: [
            '̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵', '̶', '͜', '͝', '͞', '͟', '͠', '͢', '̸', '̷', '͡', ' ҉',
        ],
    };

    return text.split('').map(char => {
        if (char === ' ') return char;
        let newChar = char;
        for (let i = 0; i < 15; i++) {
            const rand = Math.floor(Math.random() * 3);
            if (rand === 0) newChar += zalgoChars.up[Math.floor(Math.random() * zalgoChars.up.length)];
            if (rand === 1) newChar += zalgoChars.down[Math.floor(Math.random() * zalgoChars.down.length)];
            if (rand === 2) newChar += zalgoChars.mid[Math.floor(Math.random() * zalgoChars.mid.length)];
        }
        return newChar;
    }).join('');
}