const express = require('express');
const router = express.Router();
const controller = require('../Controllers/kommentErtekelesController');
const { authenticateToken } = require('../Middlewares/authMiddleware');
const {
  getUserRating
} = require('../Controllers/kommentErtekelesController');


// Kommentek
router.post('/komment', authenticateToken, controller.addKomment);
router.get('/kommentek/:id', controller.getKommentekByTudasanyag);

// Értékelések
router.post('/ertekeles', authenticateToken, controller.addOrUpdateErtekeles);
router.get('/ertekeles/atlag/:id', controller.getErtekelesAtlag);
router.get('/:tudasanyag_id/user', authenticateToken, getUserRating);
router.get('/ertekeles/top5', controller.getTopRatedTudasanyagok);

module.exports = router;
