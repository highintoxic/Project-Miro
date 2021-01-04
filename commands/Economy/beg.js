const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "beg",
  usage: "beg",
  description: "beg for money",
  run: async (client, message, args) => {
    let amount = 0;
    let timeout = 35000;

    let begCooldown = await db.fetch(`begCooldown_${message.author.id}`);

    if (begCooldown !== null && timeout - (Date.now() - begCooldown) > 0) {
      let time = ms(timeout - (Date.now() - begCooldown));

      let embed = new Discord.MessageEmbed()
        .setDescription(
          `Stop begging so much\nWait: ${time.hours} hours ${time.minutes} minutes ${time.seconds} seconds`
        )
        .setTitle("Woah, slow down!")
        .setColor("#ff0000");
      message.channel.send(embed);
    } else {
      let randomamount = Math.floor(Math.random() * Math.floor(200));

      let NoDonations = [
        `**Stranger**: I will not feed your gambling addiction`,
        `**Cookie Monster**: No u`,
        `**Charles Jenny**: Why the the frick would I donate?`,
      ];

      let badmessages =
        NoDonations[Math.floor(Math.random() * Math.floor(NoDonations.length))];

      if (randomamount === 0) {
        return message.channel.send(badmessages);
      }

      let Donations = [
        `**Pikachu** donated ${randomamount} coins to <@!${message.author.id}> :Pikachu_Love:`,
        `**Joe Mama** donated ${randomamount} coins to <@!${message.author.id}>!`,
        `**Yourself** donated ${randomamount} coins to <@!${message.author.id}>!`,
      ];

      let Messages =
        Donations[Math.floor(Math.random() * Math.floor(Donations.length))];

      message.channel.send(Messages);
      db.add(`begCooldown_${message.author.id}`, Date.now());
      db.add(`pouch_${message.author.id}`, randomamount);
    }
  },
};
