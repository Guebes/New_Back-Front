const bcrypt = require('bcrypt');

async function criar(dados, prisma) {
    const { nome, email, senha, cargo } = dados;

    const existente = await prisma.usuario.findUnique({
        where: { email }
    });

    if (existente) {
        throw new Error('E-mail já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    return prisma.usuario.create({
        data: {
            nome,
            email,
            senha: senhaHash,
            cargo
        }
    });
}

async function listar(prisma) {
    return prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
            cargo: true
        }
    });
}

module.exports = {
    criar,
    listar
};