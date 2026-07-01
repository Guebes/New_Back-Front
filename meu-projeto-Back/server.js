const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const rotaUsuario =
    require('./Rotas/RotaUsuario');

const rotaAutentic =
    require('./Rotas/RotaAutentic');

const rotaProduto =
    require('./Rotas/ProdutoRoute');

const rotaMoviment =
    require('./Rotas/MovimentRout');

const app = express();

const prisma =
    new PrismaClient();

/* =========================
   PRISMA
========================= */
app.locals.prisma =
    prisma;

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());

app.use(express.json());

/* =========================
   HOME
========================= */
app.get('/', (req, res) => {

    res.json({

        status: 'ok',

        mensagem:
            'API funcionando'

    });

});

/* =========================
   TESTE DB
========================= */
app.get(
    '/teste-db',
    async (req, res) => {

        try {

            await prisma
                .$queryRaw`SELECT 1`;

            res.json({

                status: 'ok',

                banco:
                    'conectado'

            });

        }
        catch (error) {

            res.status(500)
                .json({

                    erro:
                        error.message

                });

        }

    }
);

/* =========================
   ROTAS
========================= */
app.use(
    '/api',
    rotaUsuario
);

app.use(
    '/api',
    rotaAutentic
);

app.use(
    '/api',
    rotaProduto
);

app.use(
    '/api',
    rotaMoviment
);

/* =========================
   404
========================= */
app.use((req, res) => {

    res.status(404)
        .json({

            erro:
                'Rota não encontrada'

        });

});

/* =========================
   ERROS
========================= */
app.use(
    (
        error,
        req,
        res,
        next
    ) => {

        console.error(error);

        res.status(500)
            .json({

                erro:
                    error.message

            });

    }
);

/* =========================
   START
========================= */
const PORTA =
    process.env.PORT
    || 3001;

app.listen(
    PORTA,
    () => {

        console.log(
            `Servidor rodando na porta ${PORTA}`
        );

    }
);

/* =========================
   SHUTDOWN
========================= */
process.on(
    'SIGINT',
    async () => {

        await prisma
            .$disconnect();

        process.exit(0);

    }
);