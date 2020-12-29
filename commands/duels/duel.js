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
    name: "duel",
    aliases: ["1v1"],
    category: "Duels",
    usage: "duel <thier @> <bet>",
    description: "Duel Someone",
    run: async (client, message, args) => {
        const prefix = db.fetch(`prefix_${message.guild.id}`)
        const target = message.mentions.members.first()
        const targetUser = message.mentions.users.first()
        if (!target){
            sendMessage(message.channel, "Please Provide Someone To Duel: Usage- duel <thier @> <bet?>")
            return;
        }
        let bet = args[1]
        if (bet == null || isNaN(bet)){
            bet = 0
        }

        let moneyCheck = db.fetch(`coins_${message.guild.id}_${message.member.id}`)
        if (moneyCheck < bet){
            sendMessage(message.channel, `You only have ${pocketValue} Coins In Your Pocket \nYou Need ${bet - pocketValue} More Coins`)
            return;
        }
        let senderWeapon = db.fetch(`weapon_${message.guild.id}_${message.member.id}`)
        let senderArmor = db.fetch(`armor_${message.guild.id}_${message.member.id}`)

        db.add(`duelbet_${message.guild.id}_${message.member.id}_${target.id}`, bet)
        db.add(`duel_${message.guild.id}_${message.member.id}_${target.id}`, 20)

        var embed = new Discord.MessageEmbed()
            .setTitle(`${message.member.user.tag} Has Sent A Duel Request To ${targetUser}`)
            .setDescription(`${message.member.user.tag} Items \nArmor ${senderArmor.name} \nWeapon: ${senderWeapon.name}`)


        sendMessage(message.channel, embed, 20)

        await sleep(20000)
        db.delete(`duel_${message.guild.id}_${message.member.id}_${target.id}`)
    }
}

