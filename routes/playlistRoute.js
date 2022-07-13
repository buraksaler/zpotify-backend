const router = require('express').Router();
const { getPlaylists, addPlaylist, deletePlaylist } = require('../controllers/playlistController');

router.get('/getPlaylists', getPlaylists);
router.post('/addPlaylist', addPlaylist);
router.delete('/deletePlaylist/:id', deletePlaylist);

module.exports = router;
