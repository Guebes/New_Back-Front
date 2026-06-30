import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const resposta = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro);
            }

            localStorage.setItem('token', dados.token);
            localStorage.setItem('cargo', dados.usuario.cargo);

            navigate('/admin');
        } catch (error) {
            setErro(error.message || 'Erro no login');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login</h2>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br /><br />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <br /><br />

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;