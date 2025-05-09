import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

const UserSelect = ({ value, onChange }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(res => setUsers(res.data));
    }, []);

    return (
        <select value={value} onChange={onChange} className="select">
            <option value="">Selecciona un usuario</option>
            {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
            ))}
        </select>
    );
};

export default UserSelect;