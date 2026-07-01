import React, { useEffect, useState } from 'react';

function Contato() {

    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(true);

    const carregarUsuarios = async () => {

        try {

            const resposta =
                await fetch(
                    'http://localhost:3001/api/usuarios'
                );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                throw new Error(
                    dados.erro ||
                    'Erro ao carregar usuários'
                );

            }

            setUsuarios(dados);

        }
        catch (error) {

            setErro(error.message);

        }
        finally {

            setCarregando(false);

        }

    };

    useEffect(() => {

        carregarUsuarios();

    }, []);

    if (carregando) {

        return <p>Carregando...</p>;

    }

    return (

        <div style={{ padding: '20px' }}>

            <h2>
                Usuários Cadastrados
            </h2>

            {erro &&

                <p style={{ color: 'red' }}>
                    {erro}
                </p>

            }

            <table
                border="1"
                cellPadding="10"
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
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