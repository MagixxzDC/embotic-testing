require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const moment = require('moment-timezone');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    if (command.aliases) {
        command.aliases.forEach(alias => {
            client.commands.set(alias, command);
        });
    }
}

client.once('ready', async () => {
    console.log('Bot is online!');

    const channelId = '838514683253620787';
    const newChannelName = moment().tz('America/New_York').format('🕒 MM-DD-YYYY | hh:mm:ss A');

    try {
        const channel = await client.channels.fetch(channelId);
        if (channel && channel.isTextBased()) {
            await channel.setName(newChannelName);
            console.log(`Channel name changed to ${newChannelName}`);
        } else {
            console.log('Channel not found or is not a text channel.');
        }
    } catch (error) {
        console.error('Error changing channel name:', error);
    }
});

client.on('messageCreate', message => {
    if (!message.content.startsWith('-') || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.login(process.env.BOT_TOKEN);