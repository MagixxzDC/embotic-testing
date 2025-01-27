const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    name: 'joke',
    aliases: ['dadjoke', 'funny', 'j'],
    description: 'Sends a random dad joke.',
    async execute(message, args) {
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Dad Joke :man:')
                .setDescription(data.joke)
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();
            const errorembed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Unexpected Error')
                .setDescription("There was an unexpected error while trying to fetch a joke.")  
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply({ embeds: [errorembed] });
        }
    },
};