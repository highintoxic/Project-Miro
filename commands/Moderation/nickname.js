const Discord = require("discord.js");
const { MessageEmbed } = require ("discord.js"); 
const fs = require("fs");
const ms = require("ms");

module.exports =  {
  name: "rename",
  category: "moderation",
  description: "Change name a people",
  usage: "rename <@name> <newname>",

run : (client, message, args) => {
  let newname = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("<a<a:no:656537052430467074>694194464805355552> **| You do not have enought permission to rename members! **");
  if (!user) return message.channel.send('❌ **| Pls provide a person to rename!**').catch(console.error);
 message.guild.member(user).setNickname(newname).catch(console.error);
 
  const embed = new MessageEmbed()
 .setTitle (`Successfully renamed ${user.username}!`)
 .setColor ("RANDOM")
 .setDescription (`✅** | Succesfuly changed name ${user} to ${newname} **`)
 .setTimestamp()
 
message.channel.send(embed);
}
  };