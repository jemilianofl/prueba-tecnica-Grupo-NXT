import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export const registerUser = data => axios.post(`${API}/auth/signup`, data);

export const loginUser = async data => {
    try {
        const res = await axios.post(`${API}/auth/login`, data);
        return res.data;
    } catch {
        alert('Credenciales incorrectas');
        return null;
    }
};