import React, { useState } from 'react';
import Layout from '../components/Layout';
import { loginUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await loginUser(form);
        if (res?.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            navigate('/');
        }
    };

    return (
        <Layout>
            <div className="glass">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
                    <input name="password" type="password" placeholder="Contraseña" required onChange={handleChange} />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;