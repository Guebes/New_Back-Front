/* =========================
   LISTAR PRODUTOS
========================= */
async function listar(prisma) {

    return await prisma.produto.findMany({
        orderBy: {
            id: 'asc'
        }
    });

}

/* =========================
   CRIAR PRODUTO
========================= */
async function criar(dados, prisma) {

    return await prisma.produto.create({

        data: {

            nome: dados.nome,

            qtd: Number(dados.qtd),

            preco: Number(dados.preco)

        }

    });

}

/* =========================
   ATUALIZAR PRODUTO
========================= */
async function atualizar(id, dados, prisma) {

    return await prisma.produto.update({

        where: {
            id: parseInt(id)
        },

        data: {

            nome: dados.nome,

            qtd: Number(dados.qtd),

            preco: Number(dados.preco)

        }

    });

}

/* =========================
   REMOVER PRODUTO
========================= */
async function remover(id, prisma) {

    return await prisma.produto.delete({

        where: {
            id: parseInt(id)
        }

    });

}

module.exports = {

    listar,
    criar,
    atualizar,
    remover

};