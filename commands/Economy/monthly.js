const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "monthly",
  description: "Premium Monthly Gives you money monthly!",

  run: async (client, message, args) => {
    let Donators = ["463967336194375701", "559420338052661258"];
    if (!message.author.id == Donators)
      return message.reply(
        "You Do Not Have Access To This Command!\n\nYou Need To Be `Premium`Or `Donator` To Use This Command"
      );

    let amount = 35000;
    let timeout = 2592000000;

    let monthly = await db.fetch(`monthly_${message.author.id}`);

    if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
      let time = ms(timeout - (Date.now() - monthly));

      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Monthly Command")
        .setDescription(
          `You Have Already Claimed Your Rewards!\nWait:\n${time.days}.Days\n${time.hours}.Hours\n ${time.minutes}.Minutes\n ${time.seconds}.Seconds`
        )
        .setFooter("Premium Monthly");

      message.channel.send(embed);
    } else {
      let embed = new Discord.MessageEmbed()

        .setColor("RANDOM")
        .setTitle("Monthly Command")
        .setDescription(`You Have Claimed ${amount} Coins! `)
        .setFooter("Premium Monthly");

      message.channel.send(embed);
      db.add(`coins_${message.author.id}`, amount);
      db.set(`monthly_${message.author.id}`, Date.now());
    }
  },
};
