const express = require('express');

const router = express.Router();

const controladorUsuario =
    require('../Controladores/ControladorUsuario');

/* =========================
   LISTAR USUÁRIOS
   GET /api/usuarios
========================= */
router.get(
    '/usuarios',
    controladorUsuario.listar
);

/* =========================
   CADASTRAR USUÁRIO
   POST /api/usuarios
========================= */
router.post(
    '/usuarios',
    controladorUsuario.cadastrar
);

/* =========================
   BUSCAR USUÁRIO POR ID
   GET /api/usuarios/:id
========================= */
router.get(
    '/usuarios/:id',
    controladorUsuario.buscarPorId
);

/* =========================
   ATUALIZAR USUÁRIO
   PUT /api/usuarios/:id
========================= */
router.put(
    '/usuarios/:id',
    controladorUsuario.atualizar
);

/* =========================
   EXCLUIR USUÁRIO
   DELETE /api/usuarios/:id
========================= */
router.delete(
    '/usuarios/:id',
    controladorUsuario.excluir
);

module.exports = router;