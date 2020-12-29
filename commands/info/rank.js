const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "rank",
    aliases: ["rk", "r", "level", "lvl", "points"],
    description: "Returns the current rank of a member.",
    run: async (client, message, args, Discord) => {
      
      
      let member = message.mentions.members.first() || message.author;
      if (member.bot) return message.reply("bots aren't eligible for XP!");
      
      // Data
      let level = await db.get(`level_${message.guild.id}_${member.id}`);
      let exp = await db.fetch(`xp_${message.guild.id}_${member.id}`);
      let neededXP = Math.floor(Math.pow(level / 0.1, 2));
      
      // Rank
      let every = await db.all()
      every = every.filter(i => i.ID.startsWith(`xp_${message.guild.id}_`)).sort((a, b) => b.data - a.data);
      let ranking = every.map(x => x.ID).indexOf(`xp_${message.guild.id}_${member.id}`) + 1;
      
      const points = new Discord.MessageEmbed()
      .setAuthor(`${member.username}'s Rank`, member.displayAvatarURL())
      .addField(`XP / Points`, (exp).toString(), true)
      .addField(`Level`, level, true)
      .addField(`Rank`, ranking, true)
      .setColor(member.displayHexColor)
      .setThumbnail(message.guild.iconURL())
      .setFooter("Cooldown: 30 seconds")
      .setTimestamp()
      message.channel.send(points);
    }
  }