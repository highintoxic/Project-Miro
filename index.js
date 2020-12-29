const discord = require("discord.js");
const db = require("quick.db")
const client = new discord.Client();
const {
    prefix,
    token
} = require('./config.json')
const fs = require('fs');


client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.commands = new discord.Collection()
client.queue = new Map();
client.vote = new Map(); 

const extraFeatures = {
    broadcast: client.voice.createBroadcast()
};

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
}) 

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', async () => {

    client.user.setPresence({
        status: 'online'
    });

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    console.log('Miro is online!');

    while (true) {
        client.user.setActivity("=help", {
            type: "PLAYING"
        });
        await sleep(30000)
        client.user.setActivity("99.9% Uptime", {
            type: "PLAYING"
        });
        await sleep(30000)
        client.user.setActivity("some chill beats", {
            type: "LISTENING"
        });
        await sleep(30000)
        client.user.setActivity("Discord", {
            type: "PLAYING"
        });
        await sleep(30000)
        client.user.setActivity(`in ${client.guilds.cache.size} servers`, {
            type: "PLAYING"
        });
        await sleep(30000)
        client.user.setActivity(`with ${client.users.cache.size} members`, {
            type: "PLAYING"
        });
        await sleep(30000)
    }
});

client.on("message", async (message) => {

    let prefix;
    let prefixes = db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
        prefix = '='
        db.set(`prefix_${message.guild.id}`, "=");
    } else {
        prefix = prefixes;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    if (message.content === `ProjectMiroPrefix`) {
        message.delete();
        message.channel.send(`my prefix for this server is ${prefix}`);
    }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args, prefix, extraFeatures)
})

client.on('guildMemberAdd', async (member) => {
    db.set(`pocket_${member.id}`, 100)
    db.set(`bank_${member.id}`, 100)
})


client.login(token);
