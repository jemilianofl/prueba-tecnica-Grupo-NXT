import React from 'react';
import '../styles/global.css';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="container">
            <header className="glass header">
                <h1>Gestión de Tareas</h1>
                <nav className="nav-links">
                    <Link to="/">Tareas</Link>
                    <Link to="/crear">Crear Tarea</Link>
                </nav>
            </header>
            {children}
        </div>
    );
};

export default Layout;