const Discord = require("discord.js");
const db = require(`quick.db`);
const pagination = require("discord.js-pagination");
module.exports = {
  name: "shop",
  description: "View the shop",

  async run(client, message, args) {
    let prefix = db.get(`prefix_${message.guild.id}`);

    const embed = new Discord.MessageEmbed()
      .setTitle("Store")
      .setColor("RANDOM")
      .addFields(
        {
          name: "Cars",
          value: `\`${prefix}shop cars\``,
        },

        {
          name: "Items",
          value: `\`${prefix}shop items\``,
        },

        {
          name: "Houses",
          value: `\`${prefix}shop houses\``,
        },

        {
          name: "Pets",
          value: `\`${prefix}shop pets\``,
        },

        {
          name: "Premium",
          value: `\`${prefix}shop premium\``,
        }
      )
      .setTimestamp();

    message.channel.send(embed);

    if (args[1] === "cars") {
      const carindex = new Discord.MessageEmbed()
        .setTitle("Here are the different types of cars we offer!")
        .setDescription("Here are the cars you can buy at your dealership:")
        .setColor("BLUE")
        .setTimestamp()
        .addFields(
          {
            name: "Sedan (page 2)",
            value: "/u200b",
          },

          {
            name: "Coupe (page 3)",
            value: "/u200b",
          },

          {
            name: "Station wagons (page 4)",
            value: "/u200b",
          },

          {
            name: "Sports (page 5)",
            value: "/u200b",
          },

          {
            name: "Hatchback (page 7)",
            value: "/u200b",
          },

          {
            name: "Minivan (page 8)",
            value: "/u200b",
          },

          {
            name: "Pickup (page 9)",
            value: "/u200b",
          },

          {
            name: "Hyper cars (page 10)",
            value: "/u200b",
          }
        );
    }
    const sedanembed = new Discord.MessageEmbed()
      .setTitle("Sedans")
      .setDescription("Here are sedans you can buy:")
      .setColor("BLUE")
      .setTimestamp()
      .addFields(
        {
          name: "Toyota prius - ***(3,000 coins)***",
          value: "/u200b",
        },

        {
          name: "Toyota camry - ***(4,500 coins)***",
          value: "/u200b",
        },

        {
          name: "Hyundai sonata - ***(6,000 coins)***",
          value: "/u200b",
        },

        {
          name: "Toyota avalon - ***(8,000 coins)***",
          value: "/u200b",
        },

        {
          name: "Nissan Altime - ***(10,000 coins)***",
          value: "/u200b",
        },

        {
          name: "Dodge challenger - ***(27,000 coins)",
          value: "/u200b",
        }
      );

    const Coupeembed = new Discord.MessageEmbed()
      .setTitle("Coupe")
      .setDescription("Here are coupes  you can buy:")
      .setColor("BLUE")
      .setTimestamp()
      .addFields(
        {
          name: "Honda Civic Coupe Si - ***(45,000 coins)***",
          value: "/u200b",
        },

        {
          name: "Mercedes-AMG E 53 Coupe - ***(50,000 coins)***",
          value: "/u200b",
        },

        {
          name: "Volkswagen Beetle - ***(52,000 coins)***",
          value: "/u200b",
        },

        {
          name: "Audi A5 Coupe - ***(57,000 coins)***",
          value: "/u200b",
        },

        {
          name: "Chevrolet Corvette ZR1 - ***(65,0000 coins)***",
          value: "/u200b",
        },

        {
          name: "Ford Mustang Shelby GT500 - ***(65,000 coins)",
          value: "/u200b",
        }
      );

    const pages = [carindex, sedanembed, Coupeembed];

    const emojiList = ["⏪", "⏩"];

    const timeout = "120000";

    pagination(message, pages, emojiList, timeout);
  },
};

/* if (args[0] === 'rare') {
            const embedtest = new Discord.MessageEmbed()
            .setTitle("Shop")
            .setColor("RANDOM")
            .addFields(
            }  
            if (args[0] === `test`){

                const embed = new Discord.MessageEmbed()
                        .setTitle('Store')
                        .setColor("RANDOM")
                        .addFields(

        
                            {name: "Premium", value: `\`${prefix}shop premium\``}
                        )
                        .setTimestamp(); 
                
                        message.channel.send(embed);*/
