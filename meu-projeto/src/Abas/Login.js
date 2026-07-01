import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [erro, setErro] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleLogin = async (e) => {

        e.preventDefault();

        setErro('');
        setMensagem('');

        if (!email || !senha) {

            setErro(
                'Informe e-mail e senha.'
            );

            return;
        }

        try {

            const resposta =
                await fetch(
                    'http://localhost:3001/api/login',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({
                            email,
                            senha
                        })
                    }
                );

            let dados;

            try {

                dados =
                    await resposta.json();

            }
            catch {

                throw new Error(
                    'Resposta inválida do servidor.'
                );

            }

            if (!resposta.ok) {

                throw new Error(
                    dados.erro ||
                    'Erro no login'
                );

            }

            /* =========================
               TOKEN
            ========================= */
            localStorage.setItem(
                'token',
                dados.token
            );

            /* =========================
               CARGO
            ========================= */
            localStorage.setItem(
                'cargo',
                dados.usuario.cargo
            );

            /* =========================
               USUÁRIO COMPLETO
            ========================= */
            localStorage.setItem(
                'usuario',
                JSON.stringify(
                    dados.usuario
                )
            );

            setMensagem(
                'Login realizado com sucesso!'
            );

            setTimeout(() => {

                navigate('/admin');

            }, 500);

        }
        catch (error) {

            setErro(
                error.message ||
                'Erro no login'
            );

        }

    };

    return (

        <div
            style={{
                padding: '20px'
            }}
        >

            <h2>
                Login
            </h2>

            {
                mensagem &&
                (
                    <p
                        style={{
                            color: 'green'
                        }}
                    >
                        {mensagem}
                    </p>
                )
            }

            {
                erro &&
                (
                    <p
                        style={{
                            color: 'red'
                        }}
                    >
                        {erro}
                    </p>
                )
            }

            <form
                onSubmit={handleLogin}
            >

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    required
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) =>
                        setSenha(
                            e.target.value
                        )
                    }
                    required
                />

                <br />
                <br />

                <button
                    type="submit"
                >
                    Entrar
                </button>

            </form>

        </div>

    );

}

export default Login;