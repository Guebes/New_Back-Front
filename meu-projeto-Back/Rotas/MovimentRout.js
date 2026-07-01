const express = require('express');

const router = express.Router();

const movimentacaoController =
    require('../Controladores/ControladorMoviment');

const autenticarToken =
    require('../middleware/AutentToken');

/* =========================
   LISTAR MOVIMENTAÇÕES
========================= */
router.get(
    '/movimentacoes',
    autenticarToken,
    movimentacaoController.listar
);

/* =========================
   CRIAR MOVIMENTAÇÃO
========================= */
router.post(
    '/movimentacoes',
    autenticarToken,
    movimentacaoController.criar
);

module.exports = router;