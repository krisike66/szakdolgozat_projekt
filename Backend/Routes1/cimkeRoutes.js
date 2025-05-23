const express = require('express');
const router = express.Router();
const cimkeController = require('../Controllers/cimkeController');
router.post('/', cimkeController.createCimke);

router.get('/', cimkeController.getAllCimkek);

router.get('/:id', cimkeController.getCimkeById);

router.delete('/:id', cimkeController.deleteCimke);

module.exports = router;
