const { MessageEmbed } = require("discord.js");
const pagination = require("discord.js-pagination");
const db = require("quick.db");
const discord = require("discord.js");
const talkedRecently = new Set();
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//

module.exports = {
  name: "jobs",
  aliases: ["job"],
  usage: "apply (job name)",
  run: async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) {
      prefix = config.prefix;
    }

    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`);

    if (talkedRecently.has(message.author.id)) {
      message.channel.send(
        "Wait 1 minute before getting typing this again. - " + message.author
      );
    } else {
      const devjobs = new discord.MessageEmbed()
        .setTitle("List Of Dev Jobs!")
        .setColor("RANDOM")
        .addFields(
          {
            name: "Engineer",
            value: "You Can Fix Stuff!",
          },
          {
            name: "Developer",
            value: "Develop Cool Applications!",
          },
          {
            name: "Meme Maker",
            value: "Create Awesome Memes!",
          },
          {
            name: "Discord Developer",
            value: "Find Bugs And Fix Them!",
          }
        );
      const vidjobs = new discord.MessageEmbed()
        .setTitle("List Of Video Content")
        .setColor("RANDOM")
        .addFields(
          {
            name: "Youtuber",
            value: "Upload Videos And Climb To The Top!",
          },
          {
            name: "Twitch Streamer",
            value: "Go Live Upon Thousands Of People!",
          },
          {
            name: "Youtube Streamer",
            value: "Go Live Upon Thousands Of People That Doesn't Simp!",
          },
          {
            name: "News",
            value: "Broadcast Important Stuff!",
          }
        );
      const businessjobs = new discord.MessageEmbed()
        .setTitle("List Of Business Jobs!")
        .setColor("RANDOM")
        .addFields(
          {
            name: "Microsoft Reception",
            value:
              "Get Calls From Alot Of People About Support And Redirect Them!",
          },
          {
            name: "Discord Admin",
            value: "Ban People And Help People Do Stuff!",
          },
          {
            name: "United States Whitehouse Reception",
            value: "Get Calls From Important People!",
          },
          {
            name: "Facebook Administrator",
            value: "Find Hackers/Scripters And Ban Them!",
          }
        );
      const militaryjobs = new discord.MessageEmbed()
        .setTitle("List Of Military Jobs!")
        .setColor("RANDOM")
        .addFields(
          {
            name: "Special Forces",
            value: "Breach Buildings And Aquire Documents/Save People!",
          },
          {
            name: "Army",
            value: "Fight And Protect Civs!",
          },
          {
            name: "Marines",
            value: "Go Inside Enemy Area And Attack Them!",
          },
          {
            name: "Air Force",
            value: "Fly Planes And Act Gay!",
          }
        );
      const pages = [devjobs, vidjobs, businessjobs, militaryjobs];

      const emojiList = ["⏪", "⏩"];

      const timeout = "120000";

      pagination(message, pages, emojiList, timeout); //timeout

      // the user can type the command ... your command code goes here :)

      // Adds the user to the set so that they can't talk for a minute
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
      }, 60000);
    }
  },
};
