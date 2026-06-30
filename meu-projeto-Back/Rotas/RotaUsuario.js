const express = require('express');
const router = express.Router();

const usuarioController = require('../Controladores/ControladorUsuario');
const autenticarToken = require('../middleware/AutentToken');
const autorizar = require('../middleware/Autorizar');

router.post('/usuarios', usuarioController.criar);

router.get(
    '/usuarios',
    autenticarToken,
    autorizar('Administrador'),
    usuarioController.listar
);

module.exports = router;