module.exports = {
    name: 'cheese',
    description: 'Sends an infinite stream of cheese emojis.',
    async execute(message, args) {
        message.channel.send('BEHOLD THE INFINITE CHEESE');

        const interval = setInterval(() => {
            message.channel.send(':cheese:').catch(console.error);
        }, 3000);

        // Stop the interval after 1 minute to prevent spamming
        setTimeout(() => {
            clearInterval(interval);
        }, 1200000);
    },
};
