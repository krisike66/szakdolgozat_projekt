const express = require('express');
const userController = require('../Controllers/userController');
const { profile, login, createUser, getUserStats } = userController;
const {
  authenticateToken,
  verifyAdmin
} = require('../Middlewares/authMiddleware');

const router = express.Router();

// 🔓 Login (nyilvános)
router.post('/login', login);

// 🔐 Profil (bejelentkezés szükséges)
router.get('/profile', authenticateToken, profile);

// 🔐 Felhasználó létrehozása (csak admin)
router.post('/addUser', verifyAdmin, createUser);
router.post('/users', verifyAdmin, createUser);

router.get('/stats', authenticateToken, getUserStats);

// 🔐 Összes felhasználó lekérése (csak admin)
router.get('/', verifyAdmin, userController.getUsers);

// 🔐 Egy felhasználó lekérése (csak admin)
router.get('/:id', verifyAdmin, userController.getUserById);

// 🔐 Felhasználó törlése (csak admin)
router.delete('/:id', verifyAdmin, userController.deleteUser);

// 🔐 Felhasználó módosítása (csak admin)
router.put('/:id', verifyAdmin, userController.updateUser);




module.exports = router;