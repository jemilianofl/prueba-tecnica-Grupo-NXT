import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Layout from '../components/Layout';

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/tareas'); // Si ya está logueado, redirige automáticamente
        }
    }, []);

    return (
        <Layout>
            <div className="landing">
                <div className="glass-card">
                    <h1>Bienvenido a Tu Gestor de Tareas</h1>
                    <p>Organiza, prioriza y completa tus tareas con facilidad.</p>
                    <div className="btn-group">
                        <button onClick={() => navigate('/login')} className="primary">Iniciar sesión</button>
                        <button onClick={() => navigate('/register')} className="secondary">Registrarse</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Landing;