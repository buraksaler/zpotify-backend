const router = require('express').Router();
const { getUsers, registerUser, deleteUser, getUserByID, loginUser } = require('../controllers/userController');

router.get('/getUsers', getUsers);
router.post('/registerUser', registerUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUserByID/:id', getUserByID);
router.post('/loginUser', loginUser);

module.exports = router;