module.exports = {
    name: 'ping',
    category: "info",
    description: "This will show the bots ping in milliseconds",
    usage: ">ping",
    aliases: ["p"],
    run: async (client, message, args) => {
        message.channel.send("Calculating ping...").then(msg => {
            let pingtime = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`${pingtime}ms`);
        });
    }
}