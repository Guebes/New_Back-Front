const movimentacaoService = require('../services/movimentacaoService');

async function criar(req, res) {
    try {
        const resultado = await movimentacaoService.criar(
            req.body,
            req.usuario,
            req.app.locals.prisma
        );

        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({
            erro: error.message
        });
    }
}

module.exports = { criar };