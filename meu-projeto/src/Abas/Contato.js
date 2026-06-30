import React, { useState, useEffect } from 'react';

function Contato() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                const resposta = await fetch('http://localhost:3001/usuarios', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const dados = await resposta.json();
                setUsuarios(dados);
            } catch (error) {
                console.error(error);
            } finally {
                setCarregando(false);
            }
        };

        carregarUsuarios();
    }, []);

    if (carregando) {
        return <p>Carregando usuários...</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lista de Usuários</h2>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nome}</td>
                            <td>{u.email}</td>
                            <td>{u.cargo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Contato;