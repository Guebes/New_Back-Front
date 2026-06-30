async function listar(prisma) {
    return prisma.produto.findMany();
}

async function criar(dados, prisma) {
    const { nome, qtd, preco } = dados;

    return prisma.produto.create({
        data: {
            nome,
            qtd,
            preco
        }
    });
}

async function atualizar(id, dados, prisma) {
    const produtoId = parseInt(id);

    return prisma.produto.update({
        where: {
            id: produtoId
        },
        data: dados
    });
}

async function remover(id, prisma) {
    const produtoId = parseInt(id);

    await prisma.produto.delete({
        where: {
            id: produtoId
        }
    });

    return {
        mensagem: 'Produto removido'
    };
}

module.exports = {
    listar,
    criar,
    atualizar,
    remover
};