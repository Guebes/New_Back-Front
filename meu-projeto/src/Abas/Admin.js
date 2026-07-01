import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                'usuario'
            )
        );

    function logout() {

        localStorage.clear();

        window.location =
            '/login';

    }

    return (

        <div
            style={{
                padding: '20px'
            }}
        >

            <h1>
                Painel Administrativo
            </h1>

            {
                usuario &&
                (
                    <h3>
                        Bem-vindo,
                        {' '}
                        {usuario.nome}
                    </h3>
                )
            }

            <hr />

            <p>
                <Link to="/contato">
                    Usuários
                </Link>
            </p>

            <p>
                <Link to="/estoque">
                    Estoque
                </Link>
            </p>

            <p>
                <Link to="/movimentacao">
                    Movimentações
                </Link>
            </p>

            <br />

            <button
                onClick={logout}
            >
                Sair
            </button>

        </div>

    );

}

export default Admin;