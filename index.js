require("dotenv").config();
const Moonstone = require("moonstone-wrapper");
const bot = Moonstone(process.env.API_KEY);

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

bot.on("handRaised", async (user, room) => {
  await user.setAsSpeaker();
});

bot.on("userJoinRoom", async (user, room) => {
  if (room) {
    const welcomeMessage =
      "Welcome to " +
      room.name +
      "! " +
      "You can speak by requesting to speak.";

    await user.sendWhisper(welcomeMessage);
  }
});

// Connect the bot to Dogehouse
bot.connect();
