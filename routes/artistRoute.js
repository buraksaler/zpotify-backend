const router = require('express').Router();
const { getArtists, addArtist, deleteArtist, getArtistByID } = require('../controllers/artistController');

router.get('/getArtists', getArtists);
router.post('/addArtist', addArtist);
router.delete('/deleteArtist/:id', deleteArtist);
router.get('/getArtistByID/:id', getArtistByID);

module.exports = router;
