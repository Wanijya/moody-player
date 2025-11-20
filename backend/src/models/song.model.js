const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  audio: { type: String, required: true },
  mood: { type: String, required: true, index: true },
});

const song = mongoose.model("song", songSchema);

module.exports = song;
