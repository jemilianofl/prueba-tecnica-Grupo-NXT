import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import { isAuthenticated, getUser, logout } from '../utils/auth';

const Layout = ({ children }) => {
    const user = getUser();

    return (
        <div className="container">
            <header className="glass header">
                <h1>Gestión de Tareas</h1>
                <nav className="nav-links">
                    {isAuthenticated() ? (
                        <>
                            <Link to="/">Tareas</Link>
                            <Link to="/crear">Crear Tarea</Link>
                            <span style={{ color: '#fff' }}>Hola, {user?.name}</span>
                            <button onClick={logout} className="danger">Salir</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Registro</Link>
                        </>
                    )}
                </nav>
            </header>
            {children}
        </div>
    );
};

export default Layout;