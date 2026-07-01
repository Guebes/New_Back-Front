const express = require('express');

const router = express.Router();

const produtoController =
    require('../Controladores/ControladorProduto');

const autenticarToken =
    require('../middleware/AutentToken');

/* =========================
   LISTAR
========================= */
router.get(
    '/produtos',
    autenticarToken,
    produtoController.listar
);

/* =========================
   CRIAR
========================= */
router.post(
    '/produtos',
    autenticarToken,
    produtoController.criar
);

/* =========================
   ATUALIZAR
========================= */
router.put(
    '/produtos/:id',
    autenticarToken,
    produtoController.atualizar
);

/* =========================
   REMOVER
========================= */
router.delete(
    '/produtos/:id',
    autenticarToken,
    produtoController.remover
);

module.exports = router;