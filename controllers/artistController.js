const Artist = require('../models/artistModel');
const asyncHandler = require('express-async-handler');

//@desc Get all artists
//@route GET api/artist/
const getArtists = async (req, res) => {
  Artist.find()
  .then(artists => res.status(200).json(artists))
  .catch(err => res.status(400).json('Error: ' + err));
}

//@desc add artist
//@route POST api/artist/add
const addArtist = asyncHandler(async (req, res) => {
  const { name, photoUrl } = req.body;

  const newArtist = new Artist({
    name,
    photoUrl,
  });

  newArtist.save()
  .then(() => res.status(201).json({
    _id: newArtist.id,
    name: newArtist.name,
  }))
  .catch(err => res.status(400).json('Error: ' + err));
});

//@desc Delete artist
//@route api/artist/deleteArtist/:id
const deleteArtist = asyncHandler(async(req, res) => {
  const id = req.params['id'];
  Artist.findByIdAndRemove(id)
  .exec((err, artist) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (artist) {
      res.status(200).json({artist});
    }
  });
});

//@desc get artist by ID
//route api/artist/getArtistByID
const getArtistByID = asyncHandler(async(req,res) => {
  const id = req.params['id'];
  Artist.findById(id).exec((error, song) => {
    if(error){
      return res.status(400).json({error});
    }
    if(song){
      res.status(200).json({song});
    }
  })
});

//@desc get artist by name
//route api/artist/getArtistByName
const getArtistByName = asyncHandler(async(req,res) => {
  const name = req.params['name'];
  Artist.findOne({name: name}).exec((error, song) => {
    if(error){
      return res.status(400).json({error});
    }
    if(song){
      res.status(200).json({song});
    }
  })
});

module.exports = {
  getArtists,
  addArtist,
  deleteArtist,
  getArtistByID,
  getArtistByName
}