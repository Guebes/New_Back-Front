const { z } = require('zod');

const produtoSchema = z.object({
    nome: z.string().min(2),
    qtd: z.number().int().nonnegative(),
    preco: z.number().positive()
});

module.exports = produtoSchema;