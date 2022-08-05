const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// @desc Get all users
// @route GET api/user/
const getUsers = asyncHandler( async(req, res) => {
  User.find()
  .then(users => res.status(200).json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});

// @desc login user
// @route POST api/user/loginUser
const loginUser = asyncHandler(async(req, res) => {
  const {username, password} = req.body

  const user = await User.findOne({username});

  if(user && (await bcrypt.compare(password, user.password))){
    
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email, 
    });  

  }else{
    res.status(400);
    throw new Error('Invalid credentials');
  }

  });



// @desc Register user
// @route POST api/user/register
const registerUser = asyncHandler( async(req, res) => {
  const {username, firstName, lastName, email, phoneNumber, profilePicture, password} = req.body;

  if(!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //Check if user exists
  const usernameExists = await User.findOne({username})
  const emailExists = await User.findOne({email})
  if (usernameExists || emailExists) {
     res.status(400);
     throw new Error('User already exists!');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const newUser = new User({
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    profilePicture,
    password: hashedPassword,
  });
  
  
  if(newUser){

  newUser.save()
  .then(() => res.status(201).json({
    _id: newUser.id,
    username: newUser.username,
    email: newUser.email, 
  }))
  .catch(err => res.status(400).json('Error: ' + err));
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

});

//@desc Delete user
//@route api/user/deleteUser/:id
const deleteUser = asyncHandler(async(req, res) => {
  const id = req.params['id'];
  User.findByIdAndRemove(id)
  .exec((err, user) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (user) {
      res.status(200).json({user});
    }
  });
});

//@desc get user by ID
//route api/user/getUserByID
const getUserByID = asyncHandler(async(req,res) => {
  const id = req.params['id'];
  User.findById(id).exec((error, user) => {
    if(error){
      return res.status(400).json({error});
    }
    if(user){
      res.status(200).json({user});
    }
  })
});

module.exports = {
  getUsers,
  registerUser,
  deleteUser,
  getUserByID,
  loginUser
}
