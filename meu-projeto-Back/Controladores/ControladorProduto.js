const produtoService = require('../services/produtoService');

async function listar(req, res) {
    try {
        const produtos = await produtoService.listar(
            req.app.locals.prisma
        );

        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function criar(req, res) {
    try {
        const produto = await produtoService.criar(
            req.body,
            req.app.locals.prisma
        );

        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

async function atualizar(req, res) {
    try {
        const produto = await produtoService.atualizar(
            req.params.id,
            req.body,
            req.app.locals.prisma
        );

        res.json(produto);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

async function remover(req, res) {
    try {
        const produto = await produtoService.remover(
            req.params.id,
            req.app.locals.prisma
        );

        res.json(produto);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

module.exports = {
    listar,
    criar,
    atualizar,
    remover
};