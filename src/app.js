const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // substitua pelo domínio que deseja liberar
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // métodos HTTP permitidos
    credentials: true, // se precisar de cookies ou autenticação
  }));

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
