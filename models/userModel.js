const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    trim: true,
    minLength: 3
  },
  firstName: {
    type: String,
    minLength: 3
  },
  lastName: {
    type: String,
    minLength: 3
  } ,
  email: {
    type: String,
    required: [true, 'Please add an email'],
    minLength: 3,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minLength: 5,
  },
  phoneNumber:{
    type: String,
    unique: true,
    minLength: 12
  },
  profilePicture: {
    type: String,
  },
},
  {
    timestamps: true,
  });

const User = mongoose.model('User', userSchema);

module.exports = User;