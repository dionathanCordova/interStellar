// src/routes/account.routes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Se você usa variáveis de ambiente:
const HORIZON_URL = process.env.HORIZON_URL || 'http://localhost:8000';

// GET /accounts/:address
// buscar saldo de uma conta
router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const { data } = await axios.get(`${HORIZON_URL}/accounts/${address}`);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar a conta' });
  }
});

module.exports = router;
