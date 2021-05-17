require("dotenv").config();
const Moonstone = require("moonstone-wrapper");
const bot = Moonstone(process.env.API_KEY);
const { playBackgroundMusic } = require("./commands");

bot.on("ready", async (user) => {
  // Log to the console the username that was logged in as.
  console.log("Ready! Logged in as " + user.username);

  // Create a room then join it
  const room = await bot.createRoom({
    name: "DogeAwad Bot Room",
    description: "The DogeAwad Bot Room. (Bot in development)",
  });

  await bot.joinRoom(room);
});

bot.on("joinedRoom", async (room) => {
  // play background music
  playBackgroundMusic(room);
});

bot.on("userJoinRoom", async (user, room) => {
  if (room) {
    // welcome message
    const welcomeMessage =
      "Welcome to " +
      room.name +
      "! " +
      "Ask to speak if you want to. (I always have background music so that you can chill while speaking or listening)";

    await user.sendWhisper(welcomeMessage);
  }
});

bot.on("handRaised", async (user, room) => {
  // set user as a speaker
  await user.setAsSpeaker();
});

// Connect the bot to Dogehouse
bot.connect();
