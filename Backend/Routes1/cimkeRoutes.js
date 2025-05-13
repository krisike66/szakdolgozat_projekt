// Routes/cimkeRoutes.js

const express = require('express');
const router = express.Router();
const cimkeController = require('../Controllers/cimkeController');

// Címke létrehozása
router.post('/', cimkeController.createCimke);

// Összes címke lekérése
router.get('/', cimkeController.getAllCimkek);

// Egy adott címke lekérése
router.get('/:id', cimkeController.getCimkeById);

// Címke törlése
router.delete('/:id', cimkeController.deleteCimke);

module.exports = router;
