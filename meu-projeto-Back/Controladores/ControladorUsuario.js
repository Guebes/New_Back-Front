const usuarioService = require('../Services/ServUsuario');

async function criar(req, res) {
    try {
        const usuario = await usuarioService.criar(
            req.body,
            req.app.locals.prisma
        );

        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({
            erro: error.message
        });
    }
}

async function listar(req, res) {
    try {
        const usuarios = await usuarioService.listar(
            req.app.locals.prisma
        );

        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
}

module.exports = {
    criar,
    listar
};