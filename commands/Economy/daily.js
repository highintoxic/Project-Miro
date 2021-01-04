const discord = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const ms = require("parse-ms");

module.exports = {
  name: "daily",
  aliases: ["d"],
  category: "Economy",
  usage: "daily",
  description: "Gives you money daily!",

  run: async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) {
      prefix = config.prefix;
    }

    let amount = 1000;
    let timeout = 86400000;

    let coins = await db.fetch(
      `coins_${message.guild.id}_${message.author.id}`
    );
    db.get(`coins_${message.guild.id}_${message.author.id}`);

    let daily = await db.fetch(`daily_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let embed1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Daily Command")
        .setDescription(
          `You Have Already Claimed Your Daily Rewards!\nWait: ${time.hours} Hours ${time.minutes} Minutes ${time.seconds} Seconds`
        )
        .setFooter("Already Claimed!");

      message.channel.send(embed1);
    } else {
      let embed2 = new Discord.MessageEmbed()

        .setColor("RANDOM")
        .setTitle("Daily Command")
        .setDescription(
          `You Have Claimed ${amount} Coins! \n\nNow you have ${coins} Coins!`
        )
        .setFooter("Claiming Daily Rewards!");

      message.channel.send(embed2);
      db.add(`coins_${message.author.id}`, amount);
      db.set(`daily_${message.author.id}`, Date.now());
    }
  },
};
