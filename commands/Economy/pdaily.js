const discord = require("discord.js")
const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../config.json")
const ms = require("parse-ms")



module.exports = {
  name: "pdaily",
  aliases: ["pday"],
  category: "Economy",
  usage: "pdaily",
  description: "Gives Premium users money daily!",
  
  run: async (client, message, args) => {
let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
        prefix = config.prefix
    }
    let Donators = ["463967336194375701", "559420338052661258"]
    if (!message.author.id == Donators) return message.reply("You Do Not Have Access To This Command!\n\nYou Need To Be \`Premium\`Or \`Donator\` To Use This Command")

    let amount = 5000
    let timeout = 86400000
    
    let coins = await db.fetch(`coins_${message.guild.id}_${message.author.id}`)
    db.get(`coins_${message.guild.id}_${message.author.id}`)

    let daily = await db.fetch(`daily_${message.author.id}`)
    
    if(daily !== null && timeout - (Date.now() - daily) >0) {
      
      let time = ms(timeout - (Date.now() - daily));
      
      let embed1 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Premium Daily Command")
      .setDescription(`You Have Already Claimed Your Daily Rewards!\nWait: ${time.hours} Hours ${time.minutes} Minutes ${time.seconds} Seconds`)
      .setFooter("Premium Daily Already Claimed!")
      
      
      message.channel.send(embed1)
      
    }
    
    else {
      
      let embed2  = new Discord.MessageEmbed()
      
      .setColor('RANDOM')
      .setTitle("Premium Daily Command")
      .setDescription(`You Have Claimed ${amount} Coins! \n\nNow you have ${coins} Coins!`)
      .setFooter("Premium Daily Rewards!")
      
      message.channel.send(embed2)
      db.add(`coins_${message.author.id}`, amount)
      db.set(`daily_${message.author.id}`, Date.now())
      
      
    } 
    
  }
}   
