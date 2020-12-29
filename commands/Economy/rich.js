const db = require('quick.db');
const Discord = require('discord.js');
const sendMessage = require("../../handlers/message-handler")
const {
    owners
} = require("../../config.json")

module.exports = {
    name: "rich",
    category: "Economy",
    usage: "rich <@>",
    description: "GIves 10mill To Player",
    run: async (client, message, args) => {
        for (const owner in owners) {
            if (message.member.id == owners[owner]) {
                const target = message.mentions.members.first() || message.member
                db.add(`coins_${message.guild.id}_${target.id}`, 10000000)
                sendMessage(message.channel, `gave 10mil to <@${target.id}>`, -1)
                setTimeout(() => {message.delete()}, 250);
                return;
            }
        }
    }
}