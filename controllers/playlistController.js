const Playlist = require('../models/playlistModel');
const asyncHandler = require('express-async-handler');

//@desc get all playlists
//@route GET api/playlist/
const getPlaylists = asyncHandler(async (req, res) => {
  Playlist.find()
  .then(playlists => res.status(200).json(playlists))
  .catch(err => res.status(400).json('Error: ' + err));
});

//@desc add playlist
//@route POST api/playlist/add
const addPlaylist = asyncHandler(async (req, res) => {
  const {name, photoUrl, userId, songsIds } = req.body;
  
  const newPlaylist = new Playlist({
    name,
    photoUrl,
    userId,
    songsIds,
  });

  newPlaylist.save()
  .then(() => res.status(201).json({
    _id: newPlaylist.id,
    name: newPlaylist.name,
    userId: newPlaylist.userId,
    songsIds: newPlaylist.songsIds,
  }))
  .catch(err => res.status(400).json('Error: ' + err));
});

//@desc Delete playlist
//@route api/playlist/deletePlaylist/:id
const deletePlaylist = asyncHandler(async(req, res) => {
  const id = req.params['id'];
  Playlist.findByIdAndRemove(id)
  .exec((err, playlist) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (playlist) {
      res.status(200).json({playlist});
    }
  });
});


//TODO addSongToPlaylist

module.exports = {
  getPlaylists,
  addPlaylist,
  deletePlaylist,
}
