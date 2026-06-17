import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Painel Admin</h1>
      <p>Escolha uma das opções abaixo para gerenciar:</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/contato">
          <button style={{ marginRight: '20px', padding: '10px', cursor: 'pointer' }}>Ver Lista de Usuários</button>
        </Link>
        
        <Link to="/estoque">
          <button style={{ padding: '10px', cursor: 'pointer' }}>Ver Estoque de Produtos</button>
        </Link>
      </div>
    </div>
  );
}
export default Admin;