module.exports = {
    name: 'cheese',
    description: 'Sends an infinite stream of cheese emojis.',
    async execute(message, args) {
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

        // Stop the interval after 20 minutes to prevent spamming
        setTimeout(() => {
            if (message.client.cheeseInterval) {
                clearInterval(message.client.cheeseInterval);
                message.client.cheeseInterval = null;
            }
        }, 1200000);
    },
};
