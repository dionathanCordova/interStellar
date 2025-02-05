const axios = require('axios');

const checkHorizonStatus = async (req, res, next) => {
    try {
        const HORIZON_URL = process.env.HORIZON_URL || 'http://localhost:8000';

        await axios.get(`${HORIZON_URL}/ledgers?limit=1`);
     
        next(); // Se a requisição for bem-sucedida, segue para a próxima rota
    } catch (error) {
        res.status(503).json({ error: "Stellar Horizon não está disponível" });
    }
}

module.exports = checkHorizonStatus;