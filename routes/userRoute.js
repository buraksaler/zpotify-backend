const router = require('express').Router();
const { getUsers, registerUser, deleteUser, getUserByID, loginUser, getMe } = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

router.get('/getUsers', protect, getUsers);
router.post('/registerUser', registerUser);
router.delete('/deleteUser/:id', protect, deleteUser);
router.get('/getUserByID/:id', protect, getUserByID);
router.post('/loginUser', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
