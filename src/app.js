const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Importar as rotas
const accountRoutes = require('./routes/account.routes');
const transactionRoutes = require('./routes/transaction.routes');
const ledgerRoutes = require('./routes/ledger.routes'); 

// Usar as rotas
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/ledgers', ledgerRoutes);

module.exports = app;
