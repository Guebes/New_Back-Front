import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('cargo');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Painel Admin</h1>

            <p>Escolha uma opção:</p>

            <Link to="/contato">
                <button>Ver Usuários</button>
            </Link>

            <Link to="/estoque">
                <button style={{ marginLeft: '10px' }}>
                    Ver Estoque
                </button>
            </Link>

            <button
                onClick={logout}
                style={{ marginLeft: '10px' }}
            >
                Logout
            </button>
        </div>
    );
}

export default Admin;