require("dotenv").config();
const Moonstone = require("moonstone-wrapper");
const bot = Moonstone(process.env.API_KEY);
const ytdl = require("ytdl-core");

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
  playBackgroundMusic(room);
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

bot.on("handRaised", async (user, room) => {
  await user.setAsSpeaker();
});

// Music
const playBackgroundMusic = async (room) => {
  let stream;

  try {
    stream = await ytdl("https://www.youtube.com/watch?v=ttEI35HVpqI");
  } catch (e) {
    await room.sendChatMessage("Failed to get audio/video: " + e.message);
  }

  if (!stream) return;

  const audioConnection = await room.connect();
  audioConnection.play(stream, { type: "opus" });
};

// Connect the bot to Dogehouse
bot.connect();
