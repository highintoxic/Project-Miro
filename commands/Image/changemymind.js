const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "changemymind",
  category: "fun",
  description: "change my mind meme",
  usage: ">changemymind <text>",
  aliases: ["cmm"],
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send(
        "You need to specify text for the change my mind meme.",
        message,
        true
      );
    let text = args.join(" ");
    text = text.split(" ").join("%20");
    let link = `https://vacefron.nl/api/changemymind?text=${text}`;
    let attachment = new MessageAttachment(link, "changemymind.png");
    message.channel.send(attachment);
  },
};
