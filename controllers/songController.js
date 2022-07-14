const Song = require('../models/songModel');
const asyncHandler = require('express-async-handler');

//@desc get all songs
//@route GET api/song/
const getSongs = asyncHandler(async (req, res) => {
  Song.find()
  .then(songs => res.status(200).json(songs))
  .catch(err => res.status(400).json('Error: ' + err));
});

//@desc add song
//@route POST api/song/add
const addSong = asyncHandler(async (req, res) => {
  const {songName, artistId, photoUrl, fileUrl } = req.body;

  const newSong = new Song({
    songName,
    artistId,
    photoUrl,
    fileUrl,
  });

  newSong.save()
  .then(() => res.status(201).json({
    _id: newSong.id,
    songName: newSong.songName,
    artistId: newSong.artistId,
  }))
  .catch(err => res.status(400).json('Error: ' + err));
});

//@desc Delete song
//@route api/song/deleteSong/:id
const deleteSong = asyncHandler(async(req, res) => {
  const id = req.params['id'];
  Song.findByIdAndRemove(id)
  .exec((err, song) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (song) {
      res.status(200).json({song});
    }
  });
});

module.exports = {
  getSongs,
  addSong,
  deleteSong
}