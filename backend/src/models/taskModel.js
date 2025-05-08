const db = require('../config/db');

exports.findAll = async (userId, status) => {
    let query = 'SELECT * FROM tasks';
    const conditions = [];
    const values = [];

    if (userId) {
        conditions.push('user_id = ?');
        values.push(userId);
    }

    if (status) {
        conditions.push('status = ?');
        values.push(status);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await db.query(query, values);
    return rows;
};

exports.create = async ({ title, description, status, user_id }) => {
    const [result] = await db.query(
        'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
        [title, description, status, user_id]
    );

    return {
        id: result.insertId,
        title,
        description,
        status,
        user_id
    };
};

exports.update = async (id, { title, description, status, user_id }) => {
    const [result] = await db.query(
        `UPDATE tasks 
     SET title = ?, description = ?, status = ?, user_id = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
        [title, description, status, user_id, id]
    );

    return result.affectedRows > 0
        ? { id, title, description, status, user_id }
        : null;
};

exports.delete = async (id) => {
    const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows > 0;
};