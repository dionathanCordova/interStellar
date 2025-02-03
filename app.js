// app.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// URL do nó Stellar (Horizon) rodando localmente via Docker
// A URL é:
const HORIZON_URL = 'http://localhost:8000';

// 1. Buscar um bloco (ledger) pelo número
app.get('/block/:sequence', async (req, res) => {
  try {
    const { sequence } = req.params;
    const response = await axios.get(`${HORIZON_URL}/ledgers/${sequence}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o bloco' });
  }
});

// 2. Buscar uma transação pelo hash
app.get('/transaction/:hash', async (req, res) => {
  try {
    const { hash } = req.params;
    const response = await axios.get(`${HORIZON_URL}/transactions/${hash}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a transação' });
  }
});

// 3. Buscar saldo da conta (endereço)
app.get('/account/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const response = await axios.get(`${HORIZON_URL}/accounts/${address}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a conta' });
  }
});

// Inicia o servidor Express
app.listen(PORT, () => {
  console.log(`🚀 Explorer backend rodando em http://localhost:${PORT}`);
});
