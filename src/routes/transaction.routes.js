// src/routes/transaction.routes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

const HORIZON_URL = process.env.HORIZON_URL || 'http://localhost:8000';

// GET /transactions/:hash
// buscar dados de uma transação
router.get('/:hash', async (req, res) => {
  try {
    const { hash } = req.params;
    const { data } = await axios.get(`${HORIZON_URL}/transactions/${hash}`);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar a transação' });
  }
});

module.exports = router;
