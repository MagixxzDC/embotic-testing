const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'cheese',
    description: 'Sends an infinite stream of cheese emojis.',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#141414')
                .setTitle('Error')
                .setDescription('You do not have permission to use this command.')
                .setFooter({ text: 'Embotic', iconURL: message.guild.iconURL() })
                .setTimestamp();

            return message.reply({ embeds: [errorEmbed] });
        }

        if (args[0] === '-stop') {
            if (message.client.cheeseInterval) {
                clearInterval(message.client.cheeseInterval);
                message.channel.send('The infinite cheese has been stopped.');
                message.client.cheeseInterval = null;
            } else {
                message.channel.send('There is no infinite cheese running.');
            }
            return;
        }

        message.channel.send('BEHOLD THE INFINITE CHEESE');

        message.client.cheeseInterval = setInterval(() => {
            message.channel.send(':cheese:').catch(console.error);
        }, 3000);

        setTimeout(() => {
            if (message.client.cheeseInterval) {
                clearInterval(message.client.cheeseInterval);
                message.client.cheeseInterval = null;
            }
        }, 1200000);
    },
};
