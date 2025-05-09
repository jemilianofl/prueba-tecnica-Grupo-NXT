import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../services/api';
import TaskItem from '../components/TaskItem';
import Layout from '../components/Layout';
import UserSelect from '../components/UserSelect';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [userId, setUserId] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const loadTasks = async () => {
        const res = await fetchTasks({ userId, status });
        setTasks(res.data);
    };

    useEffect(() => {
        loadTasks();
    }, [userId, status]);

    const handleEdit = (task) => {
        navigate(`/editar/${task.id}`, { state: { task } });
    };

    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de eliminar esta tarea?')) {
            await deleteTask(id);
            loadTasks();
        }
    };

    return (
        <Layout>
            <div className="glass">
                <h2>Filtrar Tareas</h2>
                <UserSelect value={userId} onChange={(e) => setUserId(e.target.value)} />
                <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '0.5rem', borderRadius: '10px', marginLeft: '1rem' }}>
                    <option value="">Todos los estados</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en curso">En curso</option>
                    <option value="completada">Completada</option>
                </select>
            </div>

            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
        </Layout>
    );
};

export default TaskList;