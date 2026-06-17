const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const app = express();

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./prisma/dev.db"
        }
    }
});

app.use(cors());
app.use(express.json());

app.get('/produtos', async (req, res) => {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
});

app.post('/produtos', async (req, res) => {
    const { nome, qtd, preco } = req.body;
    const novoProduto = await prisma.produto.create({
        data: { nome, qtd, preco }
    });
    res.status(201).json(novoProduto);
});



app.get('/usuarios', async (req, res) => {
    const usuarios = await prisma.usuario.findMany({
        select: { id: true, nome: true, email: true, cargo: true }
    });
    res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
    const { nome, email, senha, cargo } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaHash,
                cargo: cargo || "Operador"
            }
        });

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(400).json({ erro: "E-mail já cadastrado ou dados inválidos." });
    }
});

const PORTA = 1111;
app.listen(PORTA, () => {
    console.log("Servidor rodadando");
});