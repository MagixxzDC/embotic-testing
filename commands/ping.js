const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['test', 'latency', 'ms', 'pong', 'hello', 'test'],
    description: 'Ping command',
    execute(message, args) {
        const latency = Date.now() - message.createdTimestamp;
        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Ping')
            .setDescription(`:ping_pong: Pong! | Latency: **${latency}ms.**`)
            .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};