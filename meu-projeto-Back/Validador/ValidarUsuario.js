const { z } = require('zod');

const usuarioSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(4),
    cargo: z.string()
});

module.exports = usuarioSchema;