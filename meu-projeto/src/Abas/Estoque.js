import React, { useState, useEffect } from 'react';

function Estoque() {

    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [nome, setNome] = useState('');
    const [qtd, setQtd] = useState('');
    const [preco, setPreco] = useState('');

    const [editandoId, setEditandoId] = useState(null);
    const [mensagem, setMensagem] = useState('');

    const token =
        localStorage.getItem('token');

    const carregarProdutos = async () => {

        if (!token) {

            setMensagem(
                'Usuário não autenticado'
            );

            setCarregando(false);

            return;
        }

        try {

            const resposta =
                await fetch(
                    'http://localhost:3001/api/produtos',
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                throw new Error(
                    dados.erro ||
                    'Erro ao carregar produtos'
                );

            }

            setProdutos(dados);

        }
        catch (error) {

            setMensagem(
                error.message
            );

        }
        finally {

            setCarregando(false);

        }

    };

    useEffect(() => {

        carregarProdutos();

    }, [token]);

    const limparFormulario = () => {

        setNome('');
        setQtd('');
        setPreco('');
        setEditandoId(null);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const payload = {

            nome,
            qtd: Number(qtd),
            preco: Number(preco)

        };

        try {

            let resposta;

            if (editandoId) {

                resposta =
                    await fetch(
                        `http://localhost:3001/api/produtos/${editandoId}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type':
                                    'application/json',
                                Authorization:
                                    `Bearer ${token}`
                            },
                            body:
                                JSON.stringify(
                                    payload
                                )
                        }
                    );

            }
            else {

                resposta =
                    await fetch(
                        'http://localhost:3001/api/produtos',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type':
                                    'application/json',
                                Authorization:
                                    `Bearer ${token}`
                            },
                            body:
                                JSON.stringify(
                                    payload
                                )
                        }
                    );

            }

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                throw new Error(
                    dados.erro
                );

            }

            setMensagem(
                editandoId
                    ? 'Produto atualizado'
                    : 'Produto criado'
            );

            limparFormulario();

            carregarProdutos();

        }
        catch (error) {

            setMensagem(
                error.message
            );

        }

    };

    const editarProduto = (produto) => {

        setNome(produto.nome);
        setQtd(produto.qtd);
        setPreco(produto.preco);
        setEditandoId(produto.id);

    };

    const excluirProduto = async (id) => {

        if (
            !window.confirm(
                'Excluir produto?'
            )
        ) {
            return;
        }

        try {

            const resposta =
                await fetch(
                    `http://localhost:3001/api/produtos/${id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                throw new Error(
                    dados.erro
                );

            }

            setMensagem(
                'Produto removido'
            );

            carregarProdutos();

        }
        catch (error) {

            setMensagem(
                error.message
            );

        }

    };

    if (carregando) {

        return <p>Carregando...</p>;

    }

    return (

        <div style={{ padding: '20px' }}>

            <h2>
                Controle de Estoque
            </h2>

            {mensagem &&
                <p>{mensagem}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    value={nome}
                    onChange={(e) =>
                        setNome(
                            e.target.value
                        )
                    }
                    placeholder="Nome"
                    required
                />

                <br /><br />

                <input
                    type="number"
                    value={qtd}
                    onChange={(e) =>
                        setQtd(
                            e.target.value
                        )
                    }
                    placeholder="Quantidade"
                    required
                />

                <br /><br />

                <input
                    type="number"
                    step="0.01"
                    value={preco}
                    onChange={(e) =>
                        setPreco(
                            e.target.value
                        )
                    }
                    placeholder="Preço"
                    required
                />

                <br /><br />

                <button type="submit">

                    {
                        editandoId
                            ? 'Atualizar'
                            : 'Adicionar'
                    }

                </button>

            </form>

            <br />

            <table
                border="1"
                cellPadding="10"
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Qtd</th>
                        <th>Preço</th>
                        <th>Total</th>
                        <th>Ações</th>
                    </tr>

                </thead>

                <tbody>

                    {produtos.map((p) => (

                        <tr key={p.id}>

                            <td>{p.id}</td>

                            <td>{p.nome}</td>

                            <td>{p.qtd}</td>

                            <td>
                                R$ {
                                    Number(
                                        p.preco
                                    ).toFixed(2)
                                }
                            </td>

                            <td>
                                R$ {
                                    (
                                        p.qtd *
                                        Number(
                                            p.preco
                                        )
                                    ).toFixed(2)
                                }
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        editarProduto(p)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    style={{
                                        marginLeft:
                                            '10px'
                                    }}
                                    onClick={() =>
                                        excluirProduto(
                                            p.id
                                        )
                                    }
                                >
                                    Excluir
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Estoque;