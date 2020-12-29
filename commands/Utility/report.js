const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
module.exports = {
  name: "report",
  category: "Utility",
  description: "Report a user of your choice!, Requirments: Needs A Channel With Name *reports* To Work, If There Is No Channel, Reports Wont Work!",
  usage: "<User mention>",
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("SEND_MESSAGES"))
      return message.channel.send(`No.`);
    let User = message.mentions.users.first() || null;

    if (User == null) {
      return message.channel.send(`You did not mention a user!`);
    } else {
      let Reason = args[1] || null;
      if (Reason == null) {
        return message.channel.send(
          `You did not specify a reason for the report!`
        );
      }
      let Avatar = User.displayAvatarURL();
      let Channel = message.guild.channels.cache.find(
        (ch) => ch.name === ("reports")
      );
      if (!Channel)
        return message.channel.send(
          `There is no channel in this guild which is called \`reports\``
        );
      let Embed = new MessageEmbed()
        .setTitle(`New report!`)
        .setDescription(
          `The moderator \`${message.author.tag}\` has reported the user \`${User.tag}\`! `
        )
        .setColor(`RED`)
        .setThumbnail(Avatar)
        .addFields(
          { name: "Mod ID", value: `${message.author.id}`, inline: true },
          
          { name: "Mod Tag", value: `${message.author.tag}`, inline: true },
          
          { name: "Reported ID", value: `${User.id}`, inline: true },
          
          { name: "Reported Tag", value: `${User.tag}`, inline: true },
          
          { name: "Reason", value: `*${Reason}*`, inline: true },
          
          {
            name: "Date (M/D/Y)",
            value: `${new Intl.DateTimeFormat("en-US").format(Date.now())}`,
            inline: true,
          }
        );
      Channel.send(Embed);
    }
  },
};