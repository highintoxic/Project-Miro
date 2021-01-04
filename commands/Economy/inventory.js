const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "inventory",
  description: "View your inventory",
  aliases: "inv",

  async run(client, message, args) {
    let items = await db.fetch(message.author.id);
    if (items === null)
      return message.channel.send(
        "you currently don't own any items, visit the shop and purchase some items"
      );

    const Embed = new Discord.MessageEmbed()
      .setTitle("INVENTORY")

      .addField(items);

    message.channel.send(Embed);
  },
};
