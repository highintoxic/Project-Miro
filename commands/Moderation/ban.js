module.exports = {
  name: "ban",
  aliases: ["ban", "b"],
  description: "Bans a member",

  run: async (client, message, args) => {
    const Discord = require("discord.js");

    let person = message.guild.member(message.mentions.users.first());

    if (!person)
      return message.channel.send("Please mention who you would like to ban");

    if (!person.bannable)
      return message.channel.send("I cannot ban this person.");

    if (person.id === message.author.id)
      return message.channel.send("You cannot ban yourself!");

    let reason = "No reason specified";

    if (args[2]) reason = args.splice(2).join(" ");

    if (!person.user.bot) {
      person.send(`You have been banned from this server for ${reason}.`);
    }

    person.ban({
      reason: reason,
    });

    const embed = new Discord.MessageEmbed()
      .setTitle("`Ban:`")
      .setDescription(`\`Reason:\` \`${reason}\``)
      .setAuthor(message.member.displayName)
      .setColor("RED")
      .setThumbnail(person.user.avatarURL())
      .addFields(
        {
          name: "Member",
          value: person.toString(),
          inline: true,
        },
        {
          name: "Member ID",
          value: person.id,
          inline: true,
        }
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
