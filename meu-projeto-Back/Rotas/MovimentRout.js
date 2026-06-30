const express = require('express');
const router = express.Router();

const movimentacaoController = require('../controllers/movimentacaoController');
const autenticarToken = require('../middlewares/autenticarToken');

router.post(
    '/movimentacoes',
    autenticarToken,
    movimentacaoController.criar
);

module.exports = router;