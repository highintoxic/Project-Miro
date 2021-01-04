const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const sendMessage = require("../../handlers/message-handler");

module.exports = {
  name: "withdraw",
  category: "Economy",
  usage: "withdraw <amount>",
  description: "Withdraw Money Into The Bank!",
  run: async (client, message, args) => {
    let pocketValue = db.fetch(
      `coins_${message.guild.id}_${message.member.id}`
    );
    let bankValue = db.fetch(`bank_${message.guild.id}_${message.member.id}`);

    let moneyCheck = db.fetch(`bank_${message.guild.id}_${message.member.id}`);
    if (moneyCheck < args[0]) {
      sendMessage(
        message.channel,
        `>>> You only have ${bankValue} Coins In Your Bank \nYou Need ${
          args[0] - bankValue
        } More Coins`
      );
      return;
    }

    db.subtract(`bank_${message.guild.id}_${message.member.id}`, args[0]);
    db.add(`coins_${message.guild.id}_${message.member.id}`, args[0]);

    let pocketValueX = db.fetch(
      `coins_${message.guild.id}_${message.member.id}`
    );
    let bankValueX = db.fetch(`bank_${message.guild.id}_${message.member.id}`);
    sendMessage(
      message.channel,
      `>>> <@${message.member.id}> \nWithdrawed ${
        args[0]
      } Coins From Your Bank \nPocket: ${[pocketValueX]} \nBank: ${bankValueX}`
    );
  },
};
