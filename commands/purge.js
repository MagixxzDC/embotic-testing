const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'purge',
    aliases: ['p', 'clear', 'c', 'delete', 'd'],
    description: 'Deletes a specified number of messages from the channel.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('You do not have permission to use this command.');
        }

        const filter = response => {
            return response.author.id === message.author.id;
        };

        const embed = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Purge 👹')
            .setDescription('How many messages do you want to delete?');

        const embedTimeout = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Purge 👹')
            .setDescription('You did not input a number in time.');

        const embedInvalidNumber = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Purge 👹')
            .setDescription('Please enter a valid number.');

        const embedOutOfRange = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Purge 👹')
            .setDescription('You need to input a number between 1 and 100.');

        const embedError = new EmbedBuilder()
            .setColor('#141414')
            .setTitle('Purge 👹')
            .setDescription('There was an error trying to purge messages in this channel!');

        message.channel.send({ embeds: [embed] }).then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    const response = collected.first();
                    const amount = parseInt(response.content);

                    if (isNaN(amount)) {
                        return message.channel.send({ embeds: [embedInvalidNumber] });
                    } else if (amount < 1 || amount > 100) {
                        return message.channel.send({ embeds: [embedOutOfRange] });
                    }

                    message.channel.bulkDelete(amount, true).catch(err => {
                        console.error(err);
                        message.channel.send({ embeds: [embedError] });
                    });
                })
                .catch(() => {
                    message.channel.send({ embeds: [embedTimeout] });
                });
        });
    },
};