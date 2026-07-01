const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(dados, prisma) {

    const {
        email,
        senha
    } = dados;

    /* =========================
       BUSCA USUÁRIO
    ========================= */
    const usuario =
        await prisma.usuario.findUnique({

            where: {
                email
            }

        });

    if (!usuario) {

        throw new Error(
            'Usuário não encontrado'
        );

    }

    /* =========================
       VALIDA SENHA
    ========================= */
    const senhaCorreta =
        await bcrypt.compare(

            senha,

            usuario.senha

        );

    if (!senhaCorreta) {

        throw new Error(
            'Senha inválida'
        );

    }

    /* =========================
       GERA JWT
    ========================= */
    const token =
        jwt.sign(

            {

                id: usuario.id,

                nome: usuario.nome,

                email: usuario.email,

                cargo: usuario.cargo

            },

            process.env.JWT_SECRET,

            {
                expiresIn: '8h'
            }

        );

    /* =========================
       RETORNA LOGIN
    ========================= */
    return {

        token,

        usuario: {

            id: usuario.id,

            nome: usuario.nome,

            email: usuario.email,

            cargo: usuario.cargo

        }

    };

}

module.exports = {

    login

};