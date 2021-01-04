const sendMessage = require("../../handlers/message-handler");
//sendMessage(message.channel,

module.exports = {
  name: "play",
  description: "plays a song",
  aliases: ["p"],
  run: async (client, message, args, prefix, extraFeatures) => {
    //let VoiceChannel = message.guild.channels.find(c => c.id === '758656735744753664');
    let channel = message.member.voice.channel;
    if (!channel)
      return message.reply(
        "You need to be in a voice channel to play music dumbass."
      );
    const connectperms = channel.permissionsFor(message.client.user);
    if (!connectperms.has("CONNECT"))
      return message.reply(
        "Dumb, I dont have permission to connect to that channel."
      );
    if (!connectperms.has("SPEAK"))
      return message.reply(
        "Dumb, I dont have permission to speak to that channel."
      );
    channel.join();
    const ytdl = require("ytdl-core");
    let songName = args.join(" ");
    var patt = /youtube.com\/watch\?v=/g;
    if (!patt.test(songName))
      return message.reply(
        "Sorry, but we only accept youtube videos at this moment!"
      );
    extraFeatures.broadcast.play(ytdl(songName), {
      filter: "audioonly",
    });

    for (const connection of client.voice.connections.values()) {
      connection.play(extraFeatures.broadcast);
    }
  },
};
