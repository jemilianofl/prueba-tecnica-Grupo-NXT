import React, { useState } from 'react';
import Layout from '../components/Layout';
import { registerUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await registerUser(form);
        navigate('/login');
    };

    return (
        <Layout>
            <div className="glass">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Nombre" required onChange={handleChange} />
                    <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
                    <input name="password" type="password" placeholder="Contraseña" required onChange={handleChange} />
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;