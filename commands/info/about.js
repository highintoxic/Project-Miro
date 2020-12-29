const Discord = require("discord.js")
const db = require('quick.db')

module.exports = {
  name: "about",
  aliases: ["About"],
  category: "info",
  usage: "about",
  description: "shows you the bots information",
  run: async (client, message, args) => {

    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
        prefix = config.prefix
    }

    let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle("MIRO")
    .setDescription(`Hi! my name is miro, I'm a bot ddesigned to do lots of different commands including economy commands, moderation commands, Fun commands and much more!`)
    .addField( "Servers", client.guilds.cache.size  )
    .addField('Users', client.users.cache.size)
    .addField('Owners:', 'Dorimo#5505, Galaxy?#0214, Hyper||highintoxic#7394, Redline Creations#2939')
    .addField('Support Server', "[Click Here](https://discord.gg/NN9W69H%27)")
    .setFooter(`you can use ${prefix}help to get a list of commands!`)
    message.channel.send(embed)
  }
}