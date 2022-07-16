const router = require('express').Router();
const { getSongs, addSong, deleteSong, getSongByID, getSongsByArtistID } = require('../controllers/songController');

router.get('/getSongs', getSongs);
router.post('/addSong', addSong);
router.delete('/deleteSong/:id', deleteSong);
router.get('/getSongByID/:id', getSongByID);
router.get('/getSongsByArtistID/:id', getSongsByArtistID);


module.exports = router;