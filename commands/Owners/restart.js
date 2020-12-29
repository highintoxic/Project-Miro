const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../../config.json');
client.login(config.token);



module.exports = {
 name: "bt-rst",
 allies: ["restartbot"],
 run: async (client, message, args) => {
 
 let owners = ["463967336194375701", "559420338052661258", "505606993034215434", "446495631075180564"]
        if (!message.author.id == owners) {
            return message.channel.send(`You cannot use this command!`)
        }




    }
}