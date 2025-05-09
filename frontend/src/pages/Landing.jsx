import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Layout from '../components/Layout';

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/tareas'); // redirige a tareas si ya está logueado
        }
    }, []);

    return (
        <Layout>
            <div className="glass" style={{ textAlign: 'center' }}>
                <h1>Bienvenido a la App de Gestión de Tareas</h1>
                <p>Organiza tus tareas y mantente productivo.</p>
                <div style={{ marginTop: '2rem' }}>
                    <button onClick={() => navigate('/login')}>Iniciar Sesión</button>{' '}
                    <button onClick={() => navigate('/register')}>Registrarse</button>
                </div>
            </div>
        </Layout>
    );
};

export default Landing;