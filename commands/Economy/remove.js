const Discord = require("discord.js")
const db = require("quick.db")
const sendMessage = require("../../handlers/message-handler")
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//-------------------------------------------

module.exports = {
    name: "removecoins",
    aliases: ["rc"],
    category: "Economy",
    usage: "rc @(user) (amount)",
    description: "Remove Coins From People!",
    run: async (client, message, args) => {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if (prefix == null) {
            prefix = config.prefix
        }
        let user = message.mentions.members.first() || message.member;
        let owners = ["463967336194375701", "559420338052661258", "505606993034215434", "446495631075180564"]
        if (!message.author.id === owners) return message.reply("you do not have perms to use this command, Only The Owner Of The Bot Have Access")

        if (isNaN(args[1])) return sendMessage(message.channel, `${message.author}, you need to input a valid number to remove.`)
        db.subtract(`coins_${message.guild.id}_${user.id}`, args[1])
        let coins = await db.fetch(`coins_${message.guild.id}_${user.id}`)
        
        let moneyEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:white_check_mark:753232686310752331> Successfuly Removed ${args[1]} coins From ${user} \nNew User's Balance: ${coins}`);
        sendMessage(message.channel, moneyEmbed)
    }
}