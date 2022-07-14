const router = require('express').Router();
const { getPlaylists, addPlaylist, deletePlaylist, getPlaylistByID } = require('../controllers/playlistController');

router.get('/getPlaylists', getPlaylists);
router.post('/addPlaylist', addPlaylist);
router.delete('/deletePlaylist/:id', deletePlaylist);
router.get('/getPlaylistById/:id', getPlaylistByID);


module.exports = router;
