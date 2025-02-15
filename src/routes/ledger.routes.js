// src/routes/ledger.routes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

const HORIZON_URL = process.env.HORIZON_URL || 'http://localhost:8000';

// GET /ledger/:sequence
router.get('/:sequence', async (req, res) => {
  try {
    const { sequence } = req.params;

    // Fetch ledger details
    const ledgerResponse = await axios.get(`${HORIZON_URL}/ledgers/${sequence}`);
    const ledgerData = ledgerResponse.data;

    // Fetch transactions for this ledger
    const transactionsResponse = await axios.get(`${HORIZON_URL}/ledgers/${sequence}/transactions`);
    const transactions = transactionsResponse.data._embedded.records;

    // Extract relevant transaction information
    const enrichedTransactions = transactions.map(tx => ({
      hash: tx.id,
      successful: tx.successful,
      created_at: tx.created_at,
      fee_charged: tx.fee_charged,
      operation_count: tx.operation_count
    }));

    // Combine ledger data with transactions
    const enrichedLedger = {
      ...ledgerData,
      transactions: enrichedTransactions
    };

    res.json(enrichedLedger);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o ledger' });
  }
});

module.exports = router;