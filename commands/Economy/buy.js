const db = require('quick.db');
const Discord = require('discord.js');
const sendMessage = require("../../handlers/message-handler")

module.exports = {
    name: "buy",
    description: "Buy an item from the store",

    async run(client, message, args) {
        let purchase = args.join(" ");
        if (!purchase) return sendMessage(message.channel, 'Please provide an item to buy')
        let items = await db.fetch(message.author.id, {
            items: []
        });
        let amount = await db.fetch(`coins_${message.guild.id}_${message.author.id}`)

        if (purchase === 'car'.toLowerCase()) {
            if (amount < 500) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 500);
            db.push(message.author.id, "🚗 Car");
            sendMessage(message.channel, 'Successfully bought one car')
        }
        if (purchase === 'watch'.toLowerCase()) {
            if (amount < 250) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 250);
            db.push(message.author.id, "Watch");
            sendMessage(message.channel, 'Successfully bought one car')
        }


        if (purchase === 'Basic Armor'.toLowerCase()) {
            if (amount < 100) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 100);
            db.set(`armor_${message.guild.id}_${message.member.id}`, {
                name: "Basic Armor",
                armor: 30,
            })
            sendMessage(message.channel, 'Successfully bought Basic Armor')
        }
        if (purchase === 'Copper Armor'.toLowerCase()) {
            if (amount < 300) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 300);
            db.set(`armor_${message.guild.id}_${message.member.id}`, {
                name: "Copper Armor",
                armor: 40,
            })
            sendMessage(message.channel, 'Successfully bought Copper Armor')
        }
        if (purchase === 'Steal Armor'.toLowerCase()) {
            if (amount < 600) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 600);
            db.set(`armor_${message.guild.id}_${message.member.id}`, {
                name: "Steal Armor",
                armor: 50,
            })
            sendMessage(message.channel, 'Successfully bought Steal Armor')
        }
        if (purchase === 'Titanium Armor'.toLowerCase()) {
            if (amount < 600) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 600);
            db.set(`armor_${message.guild.id}_${message.member.id}`, {
                name: "Titanium Armor",
                armor: 60,
            })
            sendMessage(message.channel, 'Successfully bought Titanium Armor')
        }
        if (purchase === 'Diamond Armor'.toLowerCase()) {
            if (amount < 1500) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 1500);
            db.set(`armor_${message.guild.id}_${message.member.id}`, {
                name: "Diamond Armor",
                armor: 70,
            })
            sendMessage(message.channel, 'Successfully bought Diamond Armor')
        }


        if (purchase === 'Knife'.toLowerCase()) {
            if (amount < 2000) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 2000);
            db.set(`weapon_${message.guild.id}_${message.member.id}`, {
                name: "Knife",
                targetOffset: -10,
                senderOffset: 10
            })
            sendMessage(message.channel, 'Successfully bought Knife')
        }
        if (purchase === 'Sword'.toLowerCase()) {
            if (amount < 4000) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 4000);
            db.set(`weapon_${message.guild.id}_${message.member.id}`, {
                name: "Sword",
                targetOffset: -20,
                senderOffset: 20
            })
            sendMessage(message.channel, 'Successfully bought Sword')
        }
        if (purchase === 'Gun'.toLowerCase()) {
            if (amount < 6000) return sendMessage(message.channel, 'You do not have enough money to buy this item. Please try another one');
            db.subtract(`coins_${message.guild.id}_${message.author.id}`, 6000);
            db.set(`weapon_${message.guild.id}_${message.member.id}`, {
                name: "Gun",
                targetOffset: -30,
                senderOffset: 30
            })
            sendMessage(message.channel, 'Successfully bought Gun')
        }
    }
}