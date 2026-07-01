const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

    console.log("Conectando...");

    const usuarios = await prisma.usuario.findMany();

    console.log("Usuarios:");
    console.log(usuarios);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });