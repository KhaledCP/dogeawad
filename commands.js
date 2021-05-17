const ytdl = require("ytdl-core-discord");

// playBackgroundMusic
const playBackgroundMusic = async (room) => {
  let stream;
  let musicVideos = [
    "https://www.youtube.com/watch?v=lTRiuFIWV54",
    "https://www.youtube.com/watch?v=rk5T2g7xxdA",
  ];
  let musicVideo;

  try {
    musicVideo = Math.floor(Math.random() * musicVideos.length);
    stream = await ytdl(musicVideos[musicVideo]);
  } catch (e) {
    await room.sendChatMessage("Failed to get audio/video: " + e.message);
  }

  if (!stream) {
    musicVideo = Math.floor(Math.random() * musicVideos.length);
    stream = await ytdl(musicVideos[musicVideos[musicVideo]]);
  }

  const audioConnection = await room.connect();
  audioConnection.play(stream, { type: "opus" });
  audioConnection.player.dispatcher.setVolume(0.3);
};

module.exports = { playBackgroundMusic };
