const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const sendMessage = require("../../handlers/message-handler");

module.exports = {
  name: "new-member",
  aliase: ["newm", "newmember"],
  category: "Economy",
  usage: "dep <amount>",
  description: "Deposit Money Into The Bank!",
  run: async (client, message, args) => {
    const target = message.mentions.members.first() || message.member;
    let pocket = db.fetch(`coins_${message.guild.id}_${target.id}`);
    let bank = db.fetch(`bank_${message.guild.id}_${target.id}`);
    if (pocket > 0 || bank > 0) {
      return;
    }

    db.set(`coins_${message.guild.id}_${target.id}`, 100);
    db.set(`bank_${message.guild.id}_${target.id}`, 100);
    return;
  },
};
