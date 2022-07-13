const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name : {
    type: String,
  },
  photoUrl : {
    type: String,
  },
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;