const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            erro: 'Token não enviado'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(403).json({
            erro: 'Token inválido'
        });
    }
}

module.exports = autenticarToken;