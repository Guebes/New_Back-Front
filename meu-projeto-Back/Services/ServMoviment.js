async function criar(dados, usuario, prisma) {
    const {
        tipo,
        quantidade,
        motivo,
        produtoId
    } = dados;

    const produto = await prisma.produto.findUnique({
        where: {
            id: produtoId
        }
    });

    if (!produto) {
        throw new Error('Produto não encontrado');
    }

    let novaQuantidade = produto.qtd;

    if (tipo === 'entrada') {
        novaQuantidade += quantidade;
    }

    if (tipo === 'saida') {
        if (produto.qtd < quantidade) {
            throw new Error('Estoque insuficiente');
        }

        novaQuantidade -= quantidade;
    }

    await prisma.produto.update({
        where: {
            id: produtoId
        },
        data: {
            qtd: novaQuantidade
        }
    });

    return prisma.movimentacao.create({
        data: {
            tipo,
            quantidade,
            motivo,
            produtoId,
            usuarioId: usuario.id
        }
    });
}

module.exports = {
    criar
};