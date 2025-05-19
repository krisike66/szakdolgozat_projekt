const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middlewares/authMiddleware');
const ertekesitesController = require('../Controllers/ertesitesController');

// Saját értesítések lekérése
router.get('/', authenticateToken, ertekesitesController.getErtesitesekByUser);

// Új értesítés létrehozása (pl. szerveren belüli logikából hívva)
router.post('/', ertekesitesController.createErtesites);

// Egy értesítés olvasottra állítása
router.patch('/:id/read', authenticateToken, ertekesitesController.markAsRead);

// Összes értesítés olvasottra állítása
router.patch('/read/all', authenticateToken, ertekesitesController.markAllAsRead);

module.exports = router;
