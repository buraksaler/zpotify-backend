const router = require('express').Router();
const { getPlaylists, addPlaylist, deletePlaylistById, getPlaylistByID, getPlaylistsByUserID, addSongToPlaylist, removeSongFromPlaylist } = require('../controllers/playlistController');

router.get('/getPlaylists', getPlaylists);
router.post('/addPlaylist', addPlaylist);
router.delete('/deletePlaylistById/:id', deletePlaylistById);
router.get('/getPlaylistById/:id', getPlaylistByID);
router.get('/getPlaylistsByUserId/:id', getPlaylistsByUserID);
router.put('/addSongToPlaylist', addSongToPlaylist);
router.put('/removeSongFromPlaylist', removeSongFromPlaylist);

module.exports = router;
