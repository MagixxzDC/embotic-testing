const https = require('https');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'lyrics',
    aliases: ['ly', 'song', 'lyric', 'l'],
    description: 'Fetch the lyrics of a song',
    async execute(message, args) {
        const song = args.join(' ');
        if (!song) {
            return message.reply('Please provide a song name.');
        }

        const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(song)}`;

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 404) {
                    return message.channel.send('Lyrics not found for the specified song.');
                }

                try {
                    const response = JSON.parse(data);
                    const lyrics = response.lyrics;

                    const embed = new EmbedBuilder()
                        .setColor('#141414')
                        .setTitle(`Lyrics for ${song}`)
                        .setDescription(lyrics.length > 2048 ? `${lyrics.slice(0, 2045)}...` : lyrics)
                        .setFooter({ text: 'Embotic', iconURL: 'https://example.com/icon.png' }) // Adjust iconURL as needed
                        .setTimestamp();

                    message.channel.send({ embeds: [embed] });
                } catch (error) {
                    console.error('Error parsing lyrics:', error);
                    message.channel.send('There was an error fetching the lyrics.');
                }
            });
        }).on('error', (error) => {
            console.error('Error fetching lyrics:', error);
            message.channel.send('There was an error fetching the lyrics.');
        });
    },
};