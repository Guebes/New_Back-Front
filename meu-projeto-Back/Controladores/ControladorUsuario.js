const bcrypt = require('bcrypt');

/* =========================
   LISTAR USUÁRIOS
========================= */
exports.listar = async (req, res) => {

    try {

        const prisma = req.app.locals.prisma;

        const usuarios = await prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                cargo: true
            }
        });

        return res.status(200).json(usuarios);

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: error.message
        });

    }

};

/* =========================
   BUSCAR USUÁRIO POR ID
========================= */
exports.buscarPorId = async (req, res) => {

    try {

        const prisma = req.app.locals.prisma;

        const id = parseInt(req.params.id);

        const usuario = await prisma.usuario.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                nome: true,
                email: true,
                cargo: true
            }
        });

        if (!usuario) {

            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });

        }

        return res.status(200).json(usuario);

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: error.message
        });

    }

};

/* =========================
   CADASTRAR USUÁRIO
========================= */
exports.cadastrar = async (req, res) => {

    try {

        const prisma = req.app.locals.prisma;

        const {
            nome,
            email,
            senha,
            cargo
        } = req.body;

        if (!nome || !email || !senha) {

            return res.status(400).json({
                erro: 'Nome, email e senha são obrigatórios'
            });

        }

        const usuarioExistente =
            await prisma.usuario.findUnique({
                where: {
                    email
                }
            });

        if (usuarioExistente) {

            return res.status(400).json({
                erro: 'Usuário já cadastrado'
            });

        }

        const senhaHash =
            await bcrypt.hash(senha, 10);

        const usuario =
            await prisma.usuario.create({

                data: {

                    nome,
                    email,
                    senha: senhaHash,
                    cargo: cargo || 'Operador'

                },

                select: {
                    id: true,
                    nome: true,
                    email: true,
                    cargo: true
                }

            });

        return res.status(201).json(usuario);

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: error.message
        });

    }

};

/* =========================
   ATUALIZAR USUÁRIO
========================= */
exports.atualizar = async (req, res) => {

    try {

        const prisma = req.app.locals.prisma;

        const id = parseInt(req.params.id);

        const {
            nome,
            email,
            cargo
        } = req.body;

        const usuario =
            await prisma.usuario.findUnique({
                where: {
                    id
                }
            });

        if (!usuario) {

            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });

        }

        const atualizado =
            await prisma.usuario.update({

                where: {
                    id
                },

                data: {
                    nome,
                    email,
                    cargo
                },

                select: {
                    id: true,
                    nome: true,
                    email: true,
                    cargo: true
                }

            });

        return res.status(200).json(atualizado);

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: error.message
        });

    }

};

/* =========================
   EXCLUIR USUÁRIO
========================= */
exports.excluir = async (req, res) => {

    try {

        const prisma = req.app.locals.prisma;

        const id = parseInt(req.params.id);

        const usuario =
            await prisma.usuario.findUnique({
                where: {
                    id
                }
            });

        if (!usuario) {

            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });

        }

        await prisma.usuario.delete({
            where: {
                id
            }
        });

        return res.status(200).json({
            mensagem: 'Usuário removido com sucesso'
        });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: error.message
        });

    }

};