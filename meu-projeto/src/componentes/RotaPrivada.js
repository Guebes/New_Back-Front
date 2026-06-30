import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, cargosPermitidos = [] }) {
    const token = localStorage.getItem('token');
    const cargo = localStorage.getItem('cargo');

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (
        cargosPermitidos.length > 0 &&
        !cargosPermitidos.includes(cargo)
    ) {
        return <Navigate to="/admin" />;
    }

    return children;
}

export default PrivateRoute;