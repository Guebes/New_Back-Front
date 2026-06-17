import React, { useState, useEffect } from 'react';

function Estoque() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [nome, setNome] = useState('');
    const [qtd, setQtd] = useState('');
    const [preco, setPreco] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        fetch('http://localhost:1111/produtos')
            .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
            .then((dados) => { setProdutos(dados); setCarregando(false); })
            .catch(() => {
                const local = localStorage.getItem('estoque_produtos');
                if (local) {
                    setProdutos(JSON.parse(local));
                } else {
                    const iniciais = [
                        { id: 1, nome: "Notebook Dell", qtd: 5, preco: 4500.00 },
                        { id: 2, nome: "Mouse Gamer", qtd: 15, preco: 150.00 }
                    ];
                    setProdutos(iniciais);
                    localStorage.setItem('estoque_produtos', JSON.stringify(iniciais));
                }
                setCarregando(false);
            });
    }, []);

    const handleAdicionar = (e) => {
        e.preventDefault();
        const novo = { id: Date.now(), nome, qtd: parseInt(qtd), preco: parseFloat(preco) };
        const atualizada = [...produtos, novo];
        setProdutos(atualizada);
        localStorage.setItem('estoque_produtos', JSON.stringify(atualizada));
        setNome(''); setQtd(''); setPreco('');
        setMensagem('🎉 Produto adicionado!');
    };

    if (carregando) return <p style={{ padding: '20px' }}>Carregando estoque...</p>;

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h2>Controle de Estoque</h2>
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', marginBottom: '20px', maxWidth: '300px', border: '1px solid #ddd' }}>
                <h3>Novo Produto</h3>
                {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
                <form onSubmit={handleAdicionar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <input type="number" placeholder="Qtd" value={qtd} onChange={(e) => setQtd(e.target.value)} required />
                    <input type="number" step="0.01" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                    <button type="submit">Adicionar</button>
                </form>
            </div>
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}><th>ID</th><th>Produto</th><th>Qtd</th><th>Preço</th><th>Total</th></tr>
                </thead>
                <tbody>
                    {produtos.map(p => (
                        <tr key={p.id}><td>{p.id}</td><td>{p.nome}</td><td>{p.qtd} un</td><td>R$ {p.preco.toFixed(2)}</td><td>R$ {(p.qtd * p.preco).toFixed(2)}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Estoque;