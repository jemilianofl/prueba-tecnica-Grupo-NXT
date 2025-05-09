import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import UserSelect from '../components/UserSelect';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createTask, updateTask } from '../services/api';

const TaskForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const editing = !!id;
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'pendiente',
        user_id: ''
    });

    useEffect(() => {
        if (editing && location.state?.task) {
            setForm(location.state.task);
        }
    }, [editing, location]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await updateTask(id, form);
        } else {
            await createTask(form);
        }
        navigate('/');
    };

    return (
        <Layout>
            <div className="glass">
                <h2>{editing ? 'Editar' : 'Crear'} Tarea</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.5rem', width: '100%', borderRadius: '10px', marginBottom: '1rem' }}
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        style={{ padding: '0.5rem', width: '100%', borderRadius: '10px', marginBottom: '1rem' }}
                    />
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.5rem', width: '100%', borderRadius: '10px', marginBottom: '1rem' }}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="en curso">En curso</option>
                        <option value="completada">Completada</option>
                    </select>
                    <UserSelect value={form.user_id} onChange={(e) => setForm({ ...form, user_id: e.target.value })} />
                    <button type="submit">{editing ? 'Actualizar' : 'Crear'} Tarea</button>
                </form>
            </div>
        </Layout>
    );
};

export default TaskForm;