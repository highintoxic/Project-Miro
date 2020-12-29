const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../config.json")
const sendMessage = require("../../handlers/message-handler")

module.exports = {
    name: "dep",
    aliase: ["deposit", "depo"],
    category: "Economy",
    usage: "dep <amount>",
    description: "Deposit Money Into The Bank!",
    run: async (client, message, args) => {
        let pocketValue = db.fetch(`coins_${message.guild.id}_${message.member.id}`)
        let bankValue = db.fetch(`bank_${message.guild.id}_${message.member.id}`)

        let moneyCheck = db.fetch(`coins_${message.guild.id}_${message.member.id}`)
        if (moneyCheck < args[0]){
            sendMessage(message.channel, `You only have ${pocketValue} Coins In Your Pocket \nYou Need ${args[0] - pocketValue} More Coins`)
            return;
        }

        db.subtract(`coins_${message.guild.id}_${message.member.id}`, args[0])
        db.add(`bank_${message.guild.id}_${message.member.id}`, args[0])

        let pocketValueX = db.fetch(`coins_${message.member.id}`)
        let bankValueX = db.fetch(`bank_${message.member.id}`)
        sendMessage(message.channel, `>>> <@${message.member.id}> \nDeposited ${args[0]} Coins Into Your Bank \nPocket: ${[pocketValueX]} \nBank: ${bankValueX}`)
    }
}