const Song = require('../models/songModel');
const Artist = require('../models/artistModel');
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

//@desc get song by ID
//route api/song/getSongByID
const getSongByID = asyncHandler(async(req,res) => {
  const id = req.params['id'];
  Song.findById(id).exec((error, song) => {
    if(error){
      return res.status(400).json({error});
    }
    if(song){
      res.status(200).json({song});
    }
  })
});

//@desc get songs by Artist ID
//route api/song/getSongsByArtistID
const getSongsByArtistID = asyncHandler(async(req,res) => {
  const id = req.params['id'];
  Artist.findById(id).exec((error, artist) => {
    if(error){
      return res.status(400).json({error});
    }
    if(artist){
      Song.find({artistId: artist._id}).exec((error, song) => {
        if(error) return res.status(400).json({error});
        if(song) {
          res.status(200).json({song});
        }else{
          return res.status(404).json({errorMessage: "There is no song for this artist!"});
        }
      });
    }
  })
});

module.exports = {
  getSongs,
  addSong,
  deleteSong,
  getSongByID,
  getSongsByArtistID
}