const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name : {
    type: String,
    required: [true, 'Please add a playlist name'],
  },
  photoUrl : {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'User',
  },
  songsIds: [{
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'Song',
  }],
}
);

const Playlist = mongoose.model('Playlist', playlistSchema );
module.exports = Playlist;
