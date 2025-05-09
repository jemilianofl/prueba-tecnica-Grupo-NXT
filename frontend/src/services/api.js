import axios from 'axios';
import { getToken } from '../utils/auth';

const API = import.meta.env.VITE_API_URL;

// console.log('📦 API Base URL:', API);

const instance = axios.create({
    baseURL: API,
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const fetchUsers = () => instance.get('/users');
export const createUser = data => instance.post('/users', data);

export const fetchTasks = params => instance.get('/tasks', { params });
export const createTask = data => instance.post('/tasks', data);
export const updateTask = (id, data) => instance.put(`/tasks/${id}`, data);
export const deleteTask = id => instance.delete(`/tasks/${id}`);
