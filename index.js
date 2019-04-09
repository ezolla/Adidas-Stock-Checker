// Importing Required Modules
const rp = require("request-promise");
const Discord = require("discord.js");

const config = require("./config");
const log = require("./classes/log");

// Initializing Discord Client
const client = new Discord.Client();

// Ready Event
client.on("ready", () => {
  log.green(`Logged in as ${client.user.tag}!`);
  client.user
    .setPresence({
      game: {
        name: `${config.Discord.prefix}adistock PID | @exhwn`
      },
      status: "avaliable"
    })
    .then(log.green("Discord Presence Set!"));
});

// Message Event
client.on("message", msg => {
  if (
    msg.content.toLowerCase().startsWith(`${config.Discord.prefix}adistock`)
  ) {
    let args = msg.content.split(" ");
    let pid = args[1];
    if (pid && pid.length === 6) {
      log.green("Successfully Recieved PID Arugment");
      getStock(msg, pid);
    } else {
      log.red("Failed to Recieve PID Arugment");
      sendFail(msg);
    }
  }
});

// Get Stock Method
const getStock = (msg, pid) => {
  var infoOptions = {
    uri: `https://www.adidas.com/api/products/${pid}`,
    forever: true,
    json: true
  };

  var stockOptions = {
    uri: `https://www.adidas.com/api/products/${pid}/availability`,
    forever: true,
    json: true
  };

  // Requesting Info Data
  rp(infoOptions)
    .then(json => {
      log.green("Successful Info API Call!");
      // Initializing Variables
      let resultMsg = "";
      let totalStock = 0;

      // Saving Static Data
      let id = json["id"];
      let name = json["name"];
      let link = json["meta_data"]["canonical"].slice(2);
      let img = json["view_list"][0]["image_url"];
      let waitingRoom = json["attribute_list"]["isWaitingRoomProduct"];

      // Requesting Stock Data
      rp(stockOptions).then(json => {
        log.green("Successful Stock API Call!");

        // Looping JSON Stock Data
        json.variation_list.forEach(elem => {
          // Parsing Desired JSON Stock Data
          let _availability = elem["availability"];
          let _size = elem["size"];

          // Building Total Stock
          totalStock += _availability;

          // Building Data Message
          resultMsg += `Size: ${_size} | Stock: ${_availability} \n`;
        });

        //Send Success to Discord
        sendSuccess(
          msg,
          resultMsg,
          totalStock,
          id,
          name,
          link,
          img,
          waitingRoom
        );
      });
    })
    .catch(err => {
      log.red("API Call Failed");
      console.log(err);
      sendFail(msg);
    });
};

// Send Data to Discord if Successful
const sendSuccess = (
  msg,
  resultMsg,
  totalStock,
  id,
  name,
  link,
  img,
  waitingRoom
) => {
  msg.channel.send({
    embed: {
      color: 0x45c577,
      author: {
        name: "Adidas Stock Checker",
        icon_url: "https://i.gyazo.com/a031d16c2a90b5fc6cf3c6563b9ecffe.png"
      },
      thumbnail: {
        url: img
      },
      title: name,
      url: `https://${link}`,
      fields: [
        {
          name: "PID",
          value: id,
          inline: true
        },
        {
          name: "Waiting Room?",
          value: waitingRoom,
          inline: true
        },
        {
          name: "Availability",
          value: resultMsg,
          inline: true
        },
        {
          name: "Total Stock",
          value: totalStock,
          inline: true
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: "https://i.gyazo.com/a031d16c2a90b5fc6cf3c6563b9ecffe.png",
        text: "Adidas Stock Checker | @exhwn"
      }
    }
  });
};

// Send MSG to Discord if Failed
const sendFail = msg => {
  msg.channel.send({
    embed: {
      color: 0x45c577,
      author: {
        name: "Adidas Stock Checker",
        icon_url: "https://i.gyazo.com/a031d16c2a90b5fc6cf3c6563b9ecffe.png"
      },
      title: "Something went wrong...",
      description: `Example: ${config.Discord.prefix}adistock B37705`,
      timestamp: new Date(),
      footer: {
        icon_url: "https://i.gyazo.com/a031d16c2a90b5fc6cf3c6563b9ecffe.png",
        text: "Adidas Stock Checker | @exhwn"
      }
    }
  });
};

client.login(config.Discord.token);
