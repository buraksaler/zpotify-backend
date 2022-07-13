const router = require('express').Router();
const { getArtists, addArtist, deleteArtist } = require('../controllers/artistController');

router.get('/getArtists', getArtists);
router.post('/addArtist', addArtist);
router.delete('/deleteArtist/:id', deleteArtist);

module.exports = router;
