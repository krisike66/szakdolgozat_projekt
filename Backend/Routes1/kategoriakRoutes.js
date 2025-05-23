const express = require('express');
const router = express.Router();
const { getAllKategoriak } = require('../Controllers/kategoriakController');

router.get('/', getAllKategoriak);
module.exports = router;