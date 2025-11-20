const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service");
const songModel = require("../models/song.model");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    // Upload
    const fileData = await uploadFile(req.file);

    // Save to DB
    const song = await songModel.create({
      title: req.body.title,
      artist: req.body.artist,
      audio: fileData.url,
      mood: req.body.mood,
    });

    res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    console.error("Error creating song:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/songs", async (req, res) => {
  try {
    const { mood } = req.query;
    if (!mood) {
      return res
        .status(400)
        .json({ message: "Mood query parameter is required" });
    }

    const songs = await songModel.find({ mood });
    res.status(200).json({ message: "Songs fetched successfully", songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
