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
    const onlineChannelId = '814759943789215755';

    const updateChannelName = async () => {
        const newChannelName = moment().tz('America/New_York').format('🕒 | hh:mm:ss A');
        try {
            const channel = await client.channels.fetch(channelId);
            if (channel && channel.isVoiceBased()) {
                await channel.setName(newChannelName);
                console.log(`Channel name changed to ${newChannelName}`);
            } else {
                console.log('Channel not found or is not a voice channel.');
            }
        } catch (error) {
            console.error('Error changing channel name:', error);
        }
    };

    try {
        const onlineChannel = await client.channels.fetch(onlineChannelId);
        if (onlineChannel && onlineChannel.isVoiceBased()) {
            await onlineChannel.setName('Online 🟢');
            console.log('Online channel name changed to Online 🟢');
        } else {
            console.log('Online channel not found or is not a voice channel.');
        }
    } catch (error) {
        console.error('Error changing online channel name:', error);
    }

    updateChannelName();
    setInterval(updateChannelName, 1200000);  
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