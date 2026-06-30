const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(dados, prisma) {
    const { email, senha } = dados;

    const usuario = await prisma.usuario.findUnique({
        where: { email }
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(
        senha,
        usuario.senha
    );

    if (!senhaCorreta) {
        throw new Error('Senha inválida');
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            cargo: usuario.cargo
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return {
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            cargo: usuario.cargo
        }
    };
}

module.exports = { login };