const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produtoController');
const autenticarToken = require('../middlewares/autenticarToken');

router.get('/produtos', autenticarToken, produtoController.listar);
router.post('/produtos', autenticarToken, produtoController.criar);
router.put('/produtos/:id', autenticarToken, produtoController.atualizar);
router.delete('/produtos/:id', autenticarToken, produtoController.remover);

module.exports = router;