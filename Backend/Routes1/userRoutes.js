//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { profile, login } = userController
const userAuth = require('../Middlewares/userAuth')

const router = express.Router()


//login route
router.post('/login', login )

router.get('/profile', profile )

module.exports = router