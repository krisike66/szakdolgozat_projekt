const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middlewares/authMiddleware');
const ertekesitesController = require('../Controllers/ertesitesController');

router.get('/', authenticateToken, ertekesitesController.getErtesitesekByUser);

router.post('/', ertekesitesController.createErtesites);

router.patch('/:id/read', authenticateToken, ertekesitesController.markAsRead);

router.patch('/read/all', authenticateToken, ertekesitesController.markAllAsRead);

module.exports = router;
