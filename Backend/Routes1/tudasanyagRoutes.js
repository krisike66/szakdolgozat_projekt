// routes/tudasanyagRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, verifyAuditerOrAdmin } = require('../Middlewares/authMiddleware');
const {
  getAllTudasanyagok,
  getTudasanyagById,
  createTudasanyag,
  updateTudasanyag,
  deleteTudasanyag,
  approveTudasanyag
} = require('../Controllers/tudasanyagController');



// Összes tudásanyag
router.get('/', getAllTudasanyagok);

// Egy tudásanyag részletesen
router.get('/:id', getTudasanyagById);

// Új tudásanyag
router.post('/', authenticateToken, createTudasanyag);

// Tudásanyag frissítése
router.put('/:id', authenticateToken, updateTudasanyag);

// Tudásanyag törlése
router.delete('/:id', authenticateToken, deleteTudasanyag);

// Tudásanyag jóváhagyása (auditer vagy admin)
router.patch('/:id/approve', verifyAuditerOrAdmin, approveTudasanyag);

router.put('/:id', authenticateToken, updateTudasanyag);


module.exports = router;
