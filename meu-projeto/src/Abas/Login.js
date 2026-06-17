import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setErro('');

        if (email && senha.length >= 4) {
            localStorage.setItem('usuarioLogado', 'true');
            navigate('/admin');
        } else {
            setErro('Credenciais inválidas.');
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h2>Página de Login</h2>
            {erro && <p style={{ color: 'red' }}><b>{erro}</b></p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/><br/>
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required /><br/><br/>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
export default Login;