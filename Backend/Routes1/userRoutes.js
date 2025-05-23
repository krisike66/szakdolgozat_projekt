const express = require('express');
const userController = require('../Controllers/userController');
const { profile, login, createUser, getUserStats } = userController;
const {
  authenticateToken,
  verifyAdmin
} = require('../Middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);

router.get('/profile', authenticateToken, profile);

router.post('/addUser', verifyAdmin, createUser);
router.post('/users', verifyAdmin, createUser);

router.get('/stats', authenticateToken, getUserStats);

router.get('/', verifyAdmin, userController.getUsers);

router.get('/:id', verifyAdmin, userController.getUserById);

router.delete('/:id', verifyAdmin, userController.deleteUser);

router.put('/:id', verifyAdmin, userController.updateUser);

module.exports = router;