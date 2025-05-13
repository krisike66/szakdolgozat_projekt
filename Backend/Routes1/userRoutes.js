//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { profile, login, createUser } = userController
const userAuth = require('../Middlewares/userAuth')
const verifyAdmin = require("../Middlewares/verifyAdmin");

const router = express.Router()


//login route
router.post('/login', login )

router.get('/profile', profile )

router.post("/users", verifyAdmin, createUser);

router.post('/addUser', createUser);

// Összes felhasználó lekérése
router.get('/', userController.getUsers);

// Felhasználó törlése
router.delete('/:id', userController.deleteUser);

// (Opcionális) Felhasználó módosítása
router.put('/:id', userController.updateUser);

router.get('/:id', userController.getUserById);

module.exports = router