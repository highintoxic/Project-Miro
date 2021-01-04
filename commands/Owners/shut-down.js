const { owners } = require("../../config.json");

module.exports = {
  name: "bt-off",
  category: "Owner Only",
  run: async (client, message, args) => {
    if (!owners.includes(message.author.id)) {
      return message.channel.send(`You cannot use this command!`);
    }
    await message.channel.send(`Turning off.....`);
    process.exit(0);
  },
};
