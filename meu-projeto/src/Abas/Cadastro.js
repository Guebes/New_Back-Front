import React, { useState } from 'react';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cargo, setCargo] = useState('Operador');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMensagem('');

        try {

            // dados que serão enviados ao backend
            const usuario = {
                nome,
                email,
                senha,
                cargo
            };

            const resposta = await fetch(
                'http://localhost:3001/api/usuarios',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(usuario)
                }
            );

            // pegar resposta como texto primeiro
            const texto = await resposta.text();

            let dados;

            try {
                dados = JSON.parse(texto);
            } catch {
                throw new Error(
                    `A API retornou HTML ao invés de JSON:\n${texto}`
                );
            }

            if (!resposta.ok) {
                throw new Error(
                    dados.erro || 'Erro ao cadastrar usuário'
                );
            }

            setMensagem('Usuário cadastrado com sucesso.');

            setNome('');
            setEmail('');
            setSenha('');
            setCargo('Operador');

        } catch (error) {
            console.error(error);
            setMensagem(error.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Cadastrar Usuário</h2>

            {mensagem && (
                <p>
                    {mensagem}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                    required
                />

                <br /><br />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />

                <br /><br />

                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha"
                    required
                />

                <br /><br />

                <select
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                >
                    <option>Operador</option>
                    <option>Gerente</option>
                    <option>Administrador</option>
                </select>

                <br /><br />

                <button type="submit">
                    Cadastrar
                </button>

            </form>
        </div>
    );
}

export default Cadastro;