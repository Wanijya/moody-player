const express = require("express");
const songRoutes = require("./routes/song.routes");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/", songRoutes);

module.exports = app;
