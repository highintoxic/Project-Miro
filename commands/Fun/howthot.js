module.exports = {
  name: "howthot",
  aliases: ["thotrate", "thot"],
  category: "fun",
  description: "Thot Machine Scanner!",
  usage: "howgay <Mention Member>",
  accessableby: "everyone",
  run: async (client, message, args) => {
    //Start

    let Member =
      message.mentions.users.first() ||
      message.guild.member(args[0]) ||
      message.author;

    let Result = Math.floor(Math.random() * 101);

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`thotrate v2 Machine`)
      .setDescription(`${Member.username} Is ${Result}% thot 😏! `)
      .setFooter(`Thotties gotta thot😏`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  },
};
