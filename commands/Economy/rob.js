//lol
const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "rob",
  aliases: ["steal"],
  usage: "rob (user's name)",
  run: async (client, message, args) => {
    let user = message.mentions.members.first();
    let targetuser = await db.fetch(`coins_${message.guild.id}_${user.id}`);
    let author = await db.fetch(`rob_${message.guild.id}_${user.id}`);
    let author2 = await db.fetch(`coins_${message.guild.id}_${user.id}`);

    let timeout = 600000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      let timeEmbed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:Cross:618736602901905418> You have already robbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:Cross:618736602901905418> You need atleast 200 coins in your wallet to rob someone`
        );

      if (author2 < 200) {
        return message.channel.send(moneyEmbed);
      }
      let moneyEmbed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:Cross:618736602901905418> ${user.user.username} does not have anything you can rob`
        );
      if (targetuser < 0) {
        return message.channel.send(moneyEmbed2);
      }

      let vip = await db.fetch(`bronze_${user.id}`);
      if (vip === true) random = Math.floor(Math.random() * 200) + 1;
      if (vip === null) random = Math.floor(Math.random() * 100) + 1;

      let embed = new Discord.RichEmbed()
        .setDescription(
          `<:Check:618736570337591296> You robbed ${user} and got away with ${random} coins`
        )
        .setColor("#FFFFFF");
      message.channel.send(embed);

      db.subtract(`coins_${message.guild.id}_${user.id}`, random);
      db.add(`coins_${message.guild.id}_${user.id}`, random);
      db.set(`rob_${message.guild.id}_${user.id}`, Date.now());
    }
  },
};
