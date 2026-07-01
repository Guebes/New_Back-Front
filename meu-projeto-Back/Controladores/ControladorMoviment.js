const movimentacaoService =
    require('../Services/ServMoviment');

/* =========================
   LISTAR
========================= */
async function listar(req, res) {

    try {

        const movimentacoes =
            await movimentacaoService.listar(
                req.app.locals.prisma
            );

        res.json(
            movimentacoes
        );

    }
    catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

}

/* =========================
   CRIAR
========================= */
async function criar(req, res) {

    try {

        if (!req.usuario) {

            return res.status(401).json({
                erro: 'Usuário não autenticado'
            });

        }

        const resultado =
            await movimentacaoService.criar(
                req.body,
                req.usuario,
                req.app.locals.prisma
            );

        res.status(201).json(
            resultado
        );

    }
    catch (error) {

        res.status(400).json({
            erro: error.message
        });

    }

}

module.exports = {

    listar,
    criar

};