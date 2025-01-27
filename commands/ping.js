module.exports = {
    name: 'ping',
    aliases: ['latency', 'ms', 'pong', 'hello', 'test'],
    description: 'Ping command',
    execute(message, args) {
        const latency = Date.now() - message.createdTimestamp;
        message.channel.send(`Pong! Latency is ${latency}ms.`);
    },
};