const router = require('express').Router();
const { getSongs, addSong, deleteSong } = require('../controllers/songController');

router.get('/', getSongs);
router.post('/addSong', addSong);
router.delete('/deleteSong/:id', deleteSong);


module.exports = router;