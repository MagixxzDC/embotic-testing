module.exports = {
    name: 'ping', 
    aliases: ['p'],
    description: 'Ping command',
    execute(message, args) {
        message.channel.send('Pong!');
    },
};