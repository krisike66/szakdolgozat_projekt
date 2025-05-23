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

const { getHasonloFromDb } = require('../Controllers/hasonloController');




router.get('/', getAllTudasanyagok);

router.get('/:id', getTudasanyagById);

router.post('/', authenticateToken, upload.single('file'), createTudasanyag);

router.put('/:id', authenticateToken, upload.single('file'), updateTudasanyag);

router.delete('/:id', authenticateToken, deleteTudasanyag);

router.patch('/:id/approve', verifyAuditerOrAdmin, approveTudasanyag);

router.get('/:id/hasonlok', getHasonloFromDb);

router.post('/', authenticateToken, upload.single('file'), createTudasanyag);

module.exports = router;
