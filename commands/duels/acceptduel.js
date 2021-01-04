const Discord = require("discord.js");
const db = require("quick.db");
const sendMessage = require("../../handlers/message-handler");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  name: "acceptduel",
  aliases: ["accept-1v1"],
  category: "Duels",
  usage: "acceptduel <thier @> ",
  description: "Accepting Someones Duel",
  run: async (client, message, args) => {
    const prefix = db.fetch(`prefix_${message.guild.id}`);
    const target = message.mentions.members.first();
    if (!target) {
      sendMessage(
        message.channel,
        "Please Make Sure That Person Is Dueling You: Usage- acceptduel <thier @>"
      );
      return;
    }

    let bet = db.fetch(
      `duelbet_${message.guild.id}_${message.member.id}_${message.member.id}`
    );

    let moneyCheck = db.fetch(`coins_${message.guild.id}_${message.member.id}`);
    if (moneyCheck < bet) {
      sendMessage(
        message.channel,
        `You only have ${pocketValue} Coins In Your Pocket \nYou Need ${
          bet - pocketValue
        } More Coins`
      );
      return;
    }

    let duel = db.fetch(
      `duel_${message.guild.id}_${target.id}_${message.member.id}`
    );

    if (duel) {
      sendMessage(message.channel, `Accepted Duel From <@${target.id}>`);
      db.delete(`duel_${message.guild.id}_${target.id}_${message.member.id}`);
      let senderValue = db.fetch(
        `armor_${message.guild.id}_${message.member.id}.armor`
      );
      let targetValue = db.fetch(
        `armor_${message.guild.id}_${target.id}.armor`
      );
      if (!senderValue) {
        senderValue = 20;
      }
      if (!targetValue) {
        targetValue = 20;
      }

      let senderWeapon = db.fetch(
        `weapon_${message.guild.id}_${message.member.id}`
      );
      let targetWeapon = db.fetch(`weapon_${message.guild.id}_${target.id}`);
      let senderArmor = db.fetch(
        `armor_${message.guild.id}_${message.member.id}`
      );
      let targetArmor = db.fetch(`armor_${message.guild.id}_${target.id}`);

      let senderDefence =
        senderValue + senderWeapon.senderOffset + senderWeapon.targetOffset;
      let targetDefence =
        targetValue + targetWeapon.senderOffset + targetWeapon.targetOffset;

      let totalDefence = senderDefence + targetDefence;

      let randomNumber = Math.floor(Math.random() * totalDefence + 1);

      var rolling = new Discord.MessageEmbed()
        .setTitle("Rolling Winner...")
        .setDescription(
          `${message.member.user.tag} Items \nDefence: ${senderDefence} \nArmor ${senderArmor.name} \nWeapon: ${senderWeapon.name} \n\n${target.user.tag} Items \nDefence: ${targetDefence} \nArmor ${targetArmor.name} \nWeapon: ${targetWeapon.name}`
        );
      sendMessage(message.channel, rolling, 5);
      await sleep(5000);
      const bet = db.fetch(
        `duelbet_${message.guild.id}_${target.id}_${message.member.id}`
      );
      if (randomNumber == 69) {
        var rollingX = new Discord.MessageEmbed()
          .setTitle(
            `Random Number Was 69 You Both Get Half Of The Bet (${
              bet / 2
            } Coins)`
          )
          .setDescription(
            `${message.member.user.tag} Items \nDefence: ${senderDefence} \nArmor ${senderArmor.name} \nWeapon: ${senderWeapon.name} \n\n${target.user.tag} Items \nDefence: ${targetDefence} \nArmor ${targetArmor.name} \nWeapon: ${targetWeapon.name}`
          )
          .setFooter(randomNumber);
        sendMessage(message.channel, rollingX);
        db.add(`coins_${message.guild.id}_${target.id}`, bet / 2);
        db.add(`coins_${message.guild.id}_${message.member.id}`, bet / 2);
        return;
      }
      if (randomNumber > targetDefence) {
        var rollingX = new Discord.MessageEmbed()
          .setTitle(`${message.member.user.tag} Wins! (${bet} Coins)`)
          .setDescription(
            `${message.member.user.tag} Items \nDefence: ${senderDefence} \nArmor ${senderArmor.name} \nWeapon: ${senderWeapon.name} \n\n${target.user.tag} Items \nDefence: ${targetDefence} \nArmor ${targetArmor.name} \nWeapon: ${targetWeapon.name}`
          )
          .setFooter(randomNumber);
        sendMessage(message.channel, rollingX);
        db.subtract(`coins_${message.guild.id}_${target.id}`, bet);
        db.add(`coins_${message.guild.id}_${message.member.id}`, bet);
        return;
      } else {
        var rollingZ = new Discord.MessageEmbed()
          .setTitle(`${target.user.tag} Wins! (${bet} Coins)`)
          .setDescription(
            `${message.member.user.tag} Items \nDefence: ${senderDefence} \nArmor ${senderArmor.name} \nWeapon: ${senderWeapon.name} \n\n${target.user.tag} Items \nDefence: ${targetDefence} \nArmor ${targetArmor.name} \nWeapon: ${targetWeapon.name}`
          )
          .setFooter(randomNumber);
        sendMessage(message.channel, rollingZ);
        db.subtract(`coins_${message.guild.id}_${message.member.id}`, bet);
        db.add(`coins_${message.guild.id}_${target.id}`, bet);
        return;
      }
    } else {
      sendMessage(
        message.channel,
        `Couldnt Find A Duel Request From <@${target.id}>`
      );
      return;
    }
  },
};
