const authService =
    require('../Services/AutenticServic');

async function login(req,res){

    try{

        const resultado =
            await authService.login(
                req.body,
                req.app.locals.prisma
            );

        res.json(resultado);

    }catch(error){

        res.status(400).json({
            erro:error.message
        });

    }

}

module.exports={login};