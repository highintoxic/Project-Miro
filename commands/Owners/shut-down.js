module.exports = {
    name: "bt-off",
    category: "owner",
    run: async (client, message, args) => {
      
        let owners = ["463967336194375701", "559420338052661258", "505606993034215434", "446495631075180564"]
        if (!message.author.id == owners) {
            return message.channel.send(`You cannot use this command!`)
        }
        await message.channel.send(`Turning off.....`)
        process.exit();
    }
}
