
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Database connected', time: result.rows[0].now });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

module.exports = router;
