const router = require("express").Router();
const Song = require("../models/songModel");
const Playlist = require("../models/playlistModel");
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const search = req.query.search;
      if (search !== "") {
        const songs = await Song.find({
          songName: { $regex: search, $options: "i" },
        }).limit(10);
        const playlists = await Playlist.find({
          name: { $regex: search, $options: "i" },
        }).limit(10);
        const result = { songs, playlists };
        res.status(200).send({ data: result });
      } else {
        res.status(200).send({});
      }
    } catch (error) {
      res.status(400).json("Error: " + error);
    }
  })
);

module.exports = router;
