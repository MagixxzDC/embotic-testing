const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'zalgo',
    aliases: ['zalgofy', 'distort'],
    description: 'Converts your text into Zalgo text.',
    async execute(message, args) {
        const text = args.join(' ');
        if (!text) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('Please provide a message to convert to Zalgo.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            return message.reply({ embeds: [errorEmbed] }).then(msg => {
                msg.delete();
            });
        }

        const zalgoText = toZalgo(text);
        message.channel.send(zalgoText);
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