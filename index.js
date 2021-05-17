require("dotenv").config();
const Moonstone = require("moonstone-wrapper");
const bot = Moonstone(process.env.API_KEY);
const { playBackgroundMusic } = require("./commands");

bot.on("ready", async (user) => {
  console.log("Ready! Logged in as " + user.username);

  const room = await bot.createRoom({
    name: "DogeAwad Bot Room",
    description: "The DogeAwad Bot Room. (Bot in development)",
  });

  await bot.joinRoom(room);
});

bot.on("joinedRoom", async (room) => {
  playBackgroundMusic(room);
});

bot.on("userJoinRoom", async (user, room) => {
  if (room) {
    const welcomeMessage =
      "Welcome to " +
      room.name +
      ". " +
      "dw!help (I always have background music so that you can chill while speaking or listening)";

    await user.sendWhisper(welcomeMessage);
  }
});

bot.on("handRaised", async (user, room) => {
  if (room) {
    if (user.username === "cpkhaled") {
      await user.setAsSpeaker();
    }
  }
});

bot.on("newChatMsg", async (msg) => {
  if (msg.content.startsWith("dw!")) {
    const command = msg.content.includes(" ")
      ? msg.content.split(" ")[0]
      : msg.content;

    const args = msg.content.includes(" ")
      ? msg.content.split(" ").slice(1)
      : [];

    const helpMsg =
      "Commands: dw!msvl <volume> - Set the background music volume (0 - 2).";

    switch (command) {
      case "dw!help":
        await msg.user.sendWhisper(helpMsg);
        break;
      case "dw!msvl":
        if (!args) {
          await msg.room.sendChatMessage("Invalid volume.");
        } else {
          const volume = parseInt(args[0]);

          if (volume < 0 || volume > 2) {
            await msg.room.sendChatMessage("Invalid volume.");
          } else {
            // TODO: Fix error > Cannot read property 'player' of undefined
            const audioConnection = msg.room.audioConnection;
            audioConnection.player.dispatcher.setVolume(args[0]);
            await msg.room.sendChatMessage("Volume has been set to " + args[0]);
            break;
          }
        }
        break;
      default:
        await msg.room.sendChatMessage(
          "Sorry, the command you sent is unknown."
        );
        break;
    }
  }
});

// Connect the bot to Dogehouse
bot.connect();
