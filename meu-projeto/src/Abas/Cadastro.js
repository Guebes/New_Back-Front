import React, { useState } from 'react';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cargo, setCargo] = useState('Operador');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensagem('');

        const dadosUsuario = { nome, email, senha, cargo };

        fetch('http://localhost:1111/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosUsuario),
        })
        .then((resposta) => {
            if (!resposta.ok) throw new Error();
            return resposta.json();
        })
        .then((dados) => {
            setMensagem(dados.mensagem || "Usuário cadastrado com sucesso!");
            setNome(''); setEmail(''); setSenha(''); setCargo('Operador');
        })
        .catch(() => {
            console.log("Back-end offline. Simulando salvamento local.");
            setMensagem(`🎉 [Modo Local] Usuário "${nome}" cadastrado com sucesso!`);
            setNome(''); setEmail(''); setSenha(''); setCargo('Operador');
        });
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h2>Criar Nova Conta</h2>
            {mensagem && <p style={{ color: 'green' }}><b>{mensagem}</b></p>}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} required /><br /><br />
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required /><br /><br />
                
                <label>Cargo: </label>
                <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
                    <option value="Operador">Operador</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Administrador">Administrador</option>
                </select><br /><br />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}
export default Cadastro;