const Playlist = require('../models/playlistModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const Song = require('../models/songModel');

// @desc get all playlists
// @route GET api/playlist/
// @access Private
const getPlaylists = asyncHandler(async (req, res) => {
  Playlist.find()
  .then(playlists => res.status(200).json(playlists))
  .catch(err => res.status(400).json('Error: ' + err));
});

// @desc add playlist
// @route POST api/playlist/add
// @access Public
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

// @desc Delete playlistById
// @route api/playlist/deletePlaylistById/:id
// @access Public
const deletePlaylistById = asyncHandler(async(req, res) => {
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

// @desc get Playlist by ID
// route api/playlist/getPlaylistByID
// @access Private
const getPlaylistByID = asyncHandler(async(req,res) => {
  const id = req.params['id'];
  Playlist.findById(id).exec((error, playlist) => {
    if(error){
      return res.status(400).json({error});
    }
    if(playlist){
      res.status(200).json({playlist});
    }
  })
});

// @desc get Playlists by User ID
// route api/playlist/getPlaylistsByUserID
// @access Public
const getPlaylistsByUserID = asyncHandler(async(req,res) => {
  const id = req.params['id'];
  User.findById(id).exec((error, user) => {
    if(error){
      return res.status(400).json({error});
    }
    if(user){
      Playlist.find({userId: user._id}).exec((error, playlist) => {
        if(error) return res.status(400).json({error});
        if(playlist) {
          res.status(200).json({playlist});
        }else{
          return res.status(404).json({errorMessage: "There is no playlist for this user!"});
        }
      });
    }
  })
});

// @desc add Song to Playlist
// route api/playlist/addSongToPlaylist
// @access Public
const addSongToPlaylist = asyncHandler(async(req,res) => {
  const {playlistId, songId} = req.body;
  Playlist.findById(playlistId).exec((error, playlist) => {
    if(error) return res.status(400).json({error});
    if(playlist){
      playlist.songsIds.push(songId);
      playlist.save();
      return res.status(200).json({playlist});
    }
  })
});

// @desc remove Song from Playlist
// route api/playlist/removeSongFromPlaylist
// @access Public
const removeSongFromPlaylist = asyncHandler(async(req,res) => {
  const {playlistId, songId} = req.body;
  Playlist.findById(playlistId).exec((error, playlist) => {
    if(error) return res.status(400).json({error});
    if(playlist){
      playlist.songsIds.pull(songId);
      playlist.save();
      return res.status(200).json({playlist});
    }
  })
});

module.exports = {
  getPlaylists,
  addPlaylist,
  deletePlaylistById,
  getPlaylistByID,
  getPlaylistsByUserID,
  addSongToPlaylist,
  removeSongFromPlaylist
}
