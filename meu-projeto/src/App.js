import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './Abas/Home';
import Sobre from './Abas/Sobre';
import Login from './Abas/Login';
import Cadastro from './Abas/Cadastro';
import Admin from './Abas/Admin';
import Estoque from './Abas/Estoque';
import Contato from './Abas/Contato';
import PrivateRoute from './componentes/RotaPrivada';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#eee', marginBottom: '20px', fontFamily: 'sans-serif' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/sobre" style={{ marginRight: '15px' }}>Sobre</Link>
        <Link to="/cadastro" style={{ marginRight: '15px' }}>Cadastrar-se</Link>
        <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
        <Link to="/estoque" style={{ fontWeight: 'bold', color: '#28a745' }}>Estoque</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="/estoque"
          element={
            <PrivateRoute>
              <Estoque />
            </PrivateRoute>
          }
        />

        <Route
          path="/contato"
          element={
            <PrivateRoute cargosPermitidos={['Administrador']}>
              <Contato />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;