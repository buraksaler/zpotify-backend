const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully.");
});

const userRouter = require("./routes/userRoute");
const artistRouter = require("./routes/artistRoute");
const songRouter = require("./routes/songRoute");
const playlistRouter = require("./routes/playlistRoute");
const searchRouter = require("./routes/searchRoute");

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/artist", artistRouter);
app.use("/api/song", songRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/", searchRouter);
app.use((req, res, next) => {
  res.json("Request Type:", req.method);
  next();
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
