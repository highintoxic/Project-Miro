const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "bt-rst",
  allies: ["restartbot"],
  category: "Owner Only",
  run: async (client, message, args) => {
    if (!config.owners.includes(message.author.id)) {
      return message.channel.send(`You cannot use this command!`);
    }
    await client.destroy();
    await client.login(config.token);
    await message.channel.send(
      new Discord.MessageEmbed().setDescription("Bot has restarted.")
    );
  },
};
