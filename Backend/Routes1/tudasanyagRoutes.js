// routes/tudasanyagRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, verifyAuditerOrAdmin } = require('../Middlewares/authMiddleware');
const upload = require('../Middlewares/upload');
const {
  getAllTudasanyagok,
  getTudasanyagById,
  createTudasanyag,
  updateTudasanyag,
  deleteTudasanyag,
  approveTudasanyag,
  getHasonloTudasanyagok
} = require('../Controllers/tudasanyagController');



// Összes tudásanyag
router.get('/', getAllTudasanyagok);

// Egy tudásanyag részletesen
router.get('/:id', getTudasanyagById);

// Új tudásanyag
router.post('/', authenticateToken, upload.single('file'), createTudasanyag);

// Tudásanyag frissítése
router.put('/:id', authenticateToken, upload.single('file'), updateTudasanyag);

// Tudásanyag törlése
router.delete('/:id', authenticateToken, deleteTudasanyag);

// Tudásanyag jóváhagyása (auditer vagy admin)
router.patch('/:id/approve', verifyAuditerOrAdmin, approveTudasanyag);



router.get('/:id/hasonlok', getHasonloTudasanyagok);


router.post('/', authenticateToken, upload.single('file'), createTudasanyag);



module.exports = router;
