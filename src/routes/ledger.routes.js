// src/routes/ledger.routes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

const HORIZON_URL = process.env.HORIZON_URL || 'http://localhost:8000';

// GET /ledger/:sequence
router.get('/:sequence', async (req, res) => {
  try {
    const { sequence } = req.params;
    const response = await axios.get(`${HORIZON_URL}/ledgers/${sequence}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o ledger' });
  }
});

module.exports = router;
