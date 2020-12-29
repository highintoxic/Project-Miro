const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
        prefix = config.prefix
    }
        const helpArray = [];

        const Index = new Discord.MessageEmbed()
        .setTitle(' ***Project Miro Help***')
        .addFields(
            { name: '🤖  | __Contents (***Page 1***)__', value: '\u200B'},
            { name: '🛡  | Moderation (***Page 2***)', value: '\u200B'},
            { name: '😄  | Fun (***Page 3***)', value: '\u200B'},
            { name: '🎉  | Giveaway (***Page 4***)', value: '\u200B'},
            { name: '🛠  | Utility (***Page 5***)', value: '\u200B'},
            { name: '⚙  | Config (***Page 6***)', value: '\u200B'}
            
        )
        .setTimestamp()
        /*.addField('📷 | Image............................................................................sPage 2') // br
        .addField('🛡 | Moderation.........................................Page 3')
        .addField('😄 | fun................................................Page 4')
        .addField('🎉   |  Giveaway.........................................Page 5')
        .addField('🛠 | Utility`', 'Page 5')
        .addField('⚙   |  Config', 'Page 6')
        .setTimestamp()*/

        
        
        const moderation = new Discord.MessageEmbed()
        .setTitle('Moderation')
        .addField(`announce`,'Announces a message in a specified channel')
        .addField(`${prefix}ban`, 'Bans a user')
        .addField(`${prefix}kick`, 'kicks a member')
        .addField(`${prefix}warn`, 'Warns a member')
        .addField(`${prefix}warnings`, 'shows the amount of warnings a person has')
        .addField(`${prefix}deletewarns`, 'deletes the warnings of a user')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('Fun')
        .addField(`${prefix}meme`, 'Generates a random meme')
        .addField(`${prefix}8ball`, 'Ask the magical 8ball a question')
        .addField(`${prefix}snipe`, 'Snipe that message like the true marksman you are')
        .addField(`${prefix}ascii`, 'Converts text into ascii')
        .addField(`${prefix}trivia`, 'Asks you a trivia question', 'hi')
        .setTimestamp()

        const Giveaway = new Discord.MessageEmbed()
        .setTitle('Giveaway')
        .addField(`${prefix}giveaway`, 'Creates a giveaway')
        .addField(`${prefix}reroll`, 'rerolls a winner for a giveaway')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('Utility')
        .addField(`${prefix}weather`, 'Checks weather forecast for provided location')
        .addField(`${prefix}calculate`, 'Calculates simple equations for you')
        .setTimestamp()

        const Config = new Discord.MessageEmbed()
        .setTitle('Config')
        .addField(`${prefix}Setprefix`, 'Sets a prefix for a server')
        .setTimestamp()

        const pages = [
                Index,
                moderation,
                fun,
                Giveaway,
                utility,
                Config
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)

        
    }
}