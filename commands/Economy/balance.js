const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json"); // hello dorimo
const Canvas = require("canvas");
const sendMessage = require("../../handlers/message-handler");

module.exports = {
  name: "balance",
  aliases: ["bal"],
  category: "Economy",
  usage: "bal",
  description: "shows you your current balance!",
  run: async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) {
      prefix = config.prefix;
    }

    const mention = message.mentions.members.first() || message.member;
    const font = "px Grandstander Light";
    const target = message.mentions.members.first() || message.member;
    let pocket = db.fetch(`coins_${message.guild.id}_${target.id}`);
    let bank = db.fetch(`bank_${message.guild.id}_${target.id}`);

    const { member, guild, channel } = message;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      "https://wallpapercave.com/wp/wp3597497.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = `28${font}}`;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `User: ${mention.user.tag}`,
      canvas.width / 2.5,
      canvas.height / 3.5
    );

    // Add an exclamation point here and below
    ctx.font = `32${font}`;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Pocket: ${pocket}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.font = `32${font}`;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Pocket: ${pocket}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.font = `32${font}`;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`bank: ${bank}!`, canvas.width / 2.5, canvas.height / 1.3);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    let avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: "jpg",
      })
    );
    if (!avatar) {
      const avatarView = message.mentions.users.first();
      avatar = await Canvas.loadImage(
        avatarView.displayAvatarURL({
          format: "jpg",
        })
      );
    }
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );

    sendMessage(channel, attachment, 20, false);
  },
};

/*if(!user) {
  .setColor('RANDOM')
  .setTitle("Balance Command")
  .setDescription(`${user} Has ${coins} Coin(s) in his balance!!`)
  .setFooter("Balance Command")
  message.channel.send(embed2)*/

/*var balance = new db.table('balance')
 let walletmoney = balance.set('walletmoney', 500) // -> 500
 balance.get('wallet') // -> 500
 let bankmoney = balance.set('bankmoney', 1000)
 db.get('myBalance') */

//let walletmoney = db.get(walletmoney)
//let bankmoney = db.get(bankmoney)

/*if(!user) {
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle(`${message.author.user.username}'s balance`)
  .addField(`Wallet - ${walletmoney}`)
  .addField(` Bank - ${bankmoney}`)
  .setFooter(`${message.author.user.username}'s balance`)
  message.channel.send(embed)*/
