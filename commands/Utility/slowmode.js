const Discord = require("discord.js")
const db = require("quick.db")


module.exports = {
  name: "slowmode",
  category: "utility",
  description: "Set the slowmode for the channel!",
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send(
        `You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );
    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
    /*let reason = args.join(" ")
    if (!reason) {
      reason == "No reason provided!"; 
    }*/
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Set the slowmode of this channel to **${args[0]}** minutes`
    );
  },
};