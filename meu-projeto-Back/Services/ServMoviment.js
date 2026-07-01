/* =========================
   LISTAR MOVIMENTAÇÕES
========================= */
async function listar(prisma) {

    return await prisma.movimentacao.findMany({

        include: {

            produto: true,

            usuario: {
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            }

        },

        orderBy: {
            createdAt: 'desc'
        }

    });

}

/* =========================
   CRIAR MOVIMENTAÇÃO
========================= */
async function criar(
    dados,
    usuario,
    prisma
) {

    const tipo =
        dados.tipo;

    const quantidade =
        Number(
            dados.quantidade
        );

    const motivo =
        dados.motivo;

    const produtoId =
        Number(
            dados.produtoId
        );

    if (
        tipo !== 'entrada' &&
        tipo !== 'saida'
    ) {

        throw new Error(
            'Tipo inválido'
        );

    }

    if (
        quantidade <= 0
    ) {

        throw new Error(
            'Quantidade inválida'
        );

    }

    const produto =
        await prisma.produto.findUnique({

            where: {
                id: produtoId
            }

        });

    if (!produto) {

        throw new Error(
            'Produto não encontrado'
        );

    }

    let novaQuantidade =
        produto.qtd;

    if (
        tipo === 'entrada'
    ) {

        novaQuantidade +=
            quantidade;

    }

    if (
        tipo === 'saida'
    ) {

        if (
            produto.qtd <
            quantidade
        ) {

            throw new Error(
                'Estoque insuficiente'
            );

        }

        novaQuantidade -=
            quantidade;

    }

    return await prisma.$transaction(
        async (tx) => {

            await tx.produto.update({

                where: {
                    id: produtoId
                },

                data: {
                    qtd:
                        novaQuantidade
                }

            });

            return await tx.movimentacao.create({

                data: {

                    tipo,

                    quantidade,

                    motivo,

                    produtoId,

                    usuarioId:
                        usuario.id

                },

                include: {

                    produto: true,

                    usuario: {

                        select: {

                            id: true,

                            nome: true

                        }

                    }

                }

            });

        }
    );

}

module.exports = {

    listar,
    criar

};