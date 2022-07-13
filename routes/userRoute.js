const router = require('express').Router();
const { getUsers, registerUser, deleteUser} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/registerUser', registerUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;