require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const moment = require('moment-timezone');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.data && command.data.name) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    } else {
        console.warn(`Command file ${file} is missing a valid command structure.`);
    }
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', async () => {
    console.log('Bot is online!');

    const channelId = '838514683253620787';

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
    
    updateChannelName();
    setInterval(updateChannelName, 60000);  
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.BOT_TOKEN);