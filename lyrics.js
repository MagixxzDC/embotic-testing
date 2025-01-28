const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'lyrics',
    description: 'Fetch the lyrics of a song',
    async execute(message, args) {
        const song = args.join(' ');
        if (!song) {
            return message.reply('Please provide a song name.');
        }

        try {
            const response = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(song)}`);
            const lyrics = response.data.lyrics;

            const embed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle(`Lyrics for ${song}`)
                .setDescription(lyrics.length > 2048 ? `${lyrics.slice(0, 2045)}...` : lyrics)
                .setFooter({ text: 'Embotic', iconURL: 'https://example.com/icon.png' }) // Adjust iconURL as needed
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error fetching the lyrics.');
        }
    },
};