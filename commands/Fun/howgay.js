const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "howgay",
  aliases: ["gayrate", "gay"],
  category: "fun",
  description: "Gay Machine Scanner!",
  usage: "howgay <Mention Member>",
  accessableby: "everyone",
  run: async (client, message, args) => {
    //Start

    let Member =
      message.mentions.users.first() ||
      message.guild.member(args[0]) ||
      message.author;

    let Result = Math.floor(Math.random() * 101);

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`gayrate v2 Machine`)
      .setDescription(`${Member.username} Is ${Result}% gay 🏳️‍🌈! `)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};