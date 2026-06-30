const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // (mantido caso use em outras rotas futuras)
const { PrismaClient } = require('@prisma/client');

const rotaUsuario = require('./Rotas/RotaUsuario');

const app = express();

/* =========================
   PRISMA
========================= */
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./prisma/dev.db"
        }
    }
});

/* 👉 ESSENCIAL: torna o prisma acessível no controller */
app.locals.prisma = prisma;

/* =========================
   MIDDLEWARES GLOBAIS
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   ROTAS
========================= */

/* Rotas de usuário (MVC)
   Ex: /api/usuarios */
app.use('/api', rotaUsuario);



app.get('/produtos', async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
});

app.get('/', (req, res) => {
    res.json({
        status: "ok",
        mensagem: "API rodando corretamente"
    });
});

app.post('/produtos', async (req, res) => {
    try {
        const { nome, qtd, preco } = req.body;

        const novoProduto = await prisma.produto.create({
            data: { nome, qtd, preco }
        });

        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ erro: "Erro ao criar produto" });
    }
});



const PORTA = 3001;

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});