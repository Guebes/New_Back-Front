const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {

    try {

        const authHeader =
            req.headers.authorization;

        /* =========================
           TOKEN AUSENTE
        ========================= */
        if (!authHeader) {

            return res.status(401).json({

                erro:
                    'Token não enviado'

            });

        }

        /* =========================
           FORMATO INVÁLIDO
        ========================= */
        if (
            !authHeader.startsWith(
                'Bearer '
            )
        ) {

            return res.status(401).json({

                erro:
                    'Formato do token inválido'

            });

        }

        const token =
            authHeader.split(' ')[1];

        /* =========================
           JWT SECRET
        ========================= */
        if (
            !process.env.JWT_SECRET
        ) {

            return res.status(500).json({

                erro:
                    'JWT_SECRET não configurado'

            });

        }

        /* =========================
           DECODIFICA
        ========================= */
        const usuario =
            jwt.verify(

                token,

                process.env.JWT_SECRET

            );

        /* =========================
           DISPONIBILIZA USUÁRIO
        ========================= */
        req.usuario =
            usuario;

        next();

    }
    catch (error) {

        return res.status(403).json({

            erro:
                'Token inválido'

        });

    }

}

module.exports =
    autenticarToken;