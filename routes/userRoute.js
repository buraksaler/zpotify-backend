const router = require('express').Router();
const { getUsers, registerUser, deleteUser, getUserByID } = require('../controllers/userController');

router.get('/getUsers', getUsers);
router.post('/registerUser', registerUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUserByID/:id', getUserByID);

module.exports = router;