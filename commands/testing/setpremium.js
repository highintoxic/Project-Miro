const Discord = require("discord.js");
const db = require("quick.db");
const { premiumCheck } = require("../../functions.js");
const { owners } = require("../../config.json");
const sendMessage = require("../../handlers/message-handler");

//==============================================

module.exports = {
  name: "setpremium",
  run: async (client, message, args) => {
    if (args[1] === "bypass") {
      if (message.member.id === owners) {
        db.add(`guild-${message.guild.id}`);

        let embed = new Discord.MessageEmbed()
          .setTitle("Success")
          .setDescription(
            `✅ successfully added premium to ${message.guild.id}`
          );

        sendMessage(message.channel, embed);
      } else {
        sendMessage(message.channel, "You Must Be An Owner To Add Premium");
      }
    } else {
      let check = premiumCheck(message.guild.id);

      if (check) {
        sendMessage(message.channel, "Server Does Have Premium");
      } else {
        sendMessage(message.channel, "Server Does NOT Have Premium");
      }
    }
  },
};
