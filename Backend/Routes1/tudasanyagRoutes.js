// routes/tudasanyagRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTudasanyagok,
  getTudasanyagById
} = require('../Controllers/tudasanyagController');

// GET /api/tudasanyagok -> Összes tudásanyag
router.get('/', getAllTudasanyagok);

// GET /api/tudasanyagok/:id -> Egy tudásanyag részletesen
router.get('/:id', getTudasanyagById);

module.exports = router;
