import React, { useState, useEffect } from 'react';

function Contato() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        fetch('http://localhost:1111/usuarios')
            .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
            .then((dados) => { setUsuarios(dados); setCarregando(false); })
            .catch(() => {
                setUsuarios([
                    { id: 1, nome: "Carlos Silva", email: "carlos@email.com", cargo: "Administrador" },
                    { id: 2, nome: "Ana Souza", email: "ana@email.com", cargo: "Gerente" }
                ]);
                setCarregando(false);
            });
    }, []);

    if (carregando) return <p style={{ padding: '20px' }}>Carregando usuários...</p>;

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h2>Lista de Usuários</h2>
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '500px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>ID</th><th>Nome</th><th>E-mail</th><th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(u => (
                        <tr key={u.id}><td>{u.id}</td><td>{u.nome}</td><td>{u.email}</td><td>{u.cargo}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Contato;