const express = require('express');
const router = express.Router();
const logsController = require('../Controllers/logsController');
const { authenticateToken, verifyAdmin } = require('../Middlewares/authMiddleware');

router.post('/logs', authenticateToken, logsController.createLog);
router.get('/logs', verifyAdmin, logsController.getLogs);

module.exports = router;
