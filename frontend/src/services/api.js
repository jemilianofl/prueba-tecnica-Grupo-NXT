import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export const fetchUsers = () => axios.get(`${API}/users`);
export const createUser = (data) => axios.post(`${API}/users`, data);

export const fetchTasks = (params) => axios.get(`${API}/tasks`, { params });
export const createTask = (data) => axios.post(`${API}/tasks`, data);
export const updateTask = (id, data) => axios.put(`${API}/tasks/${id}`, data);
export const deleteTask = (id) => axios.delete(`${API}/tasks/${id}`);