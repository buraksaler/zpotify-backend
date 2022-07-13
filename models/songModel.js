const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  songName : {
    type: String,
    required: [true, 'Please add a song name'],
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  photoUrl : {
    type: String
  },
  fileUrl: {
    required: [true, 'Please add a song url'],
    type: String,
  }
}
);

const Song = mongoose.model('Song', songSchema );
module.exports = Song;
