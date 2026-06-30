function autorizar(cargoPermitido) {
    return (req, res, next) => {
        const usuario = req.usuario;

        if (!usuario || usuario.cargo !== cargoPermitido) {
            return res.status(403).json({ erro: "Acesso negado" });
        }

        next();
    };
}

module.exports = autorizar;