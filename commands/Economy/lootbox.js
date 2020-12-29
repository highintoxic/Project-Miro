const discord = require("discord.js")
const db = require("quick.db")

//-----------------------------


module.exports = {
    name: "lootbox",
    description: "Open Some LootBoxes!",
    run: async(client, message, args) => {

        let Donators = ["463967336194375701", "559420338052661258"]
        if (!message.author.id == Donators) {
            let embed = discord.MessageEmbed()
            .setTitle("Access Denied")
            .setDescription("Access Denied\n\n\n\nReason: User Is Not A Premium User")
            .setTimestamp()
            .setFooter("Access Denied")
        }
        
        
        let lootbox = await db.fetch(`lootboxes_${message.author.id}`)

        if (lootbox === null)lootbox = 0;



        
    }
}
