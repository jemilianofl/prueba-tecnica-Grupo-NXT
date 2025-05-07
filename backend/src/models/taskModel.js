const db = require('../config/db');

exports.findAll = async (userId, status) => {
    let query = 'SELECT * FROM tasks';
    const conditions = [];
    const values = [];

    if (userId) {
        values.push(userId);
        conditions.push(`user_id = $${values.length}`);
    }

    if (status) {
        values.push(status);
        conditions.push(`status = $${values.length}`);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.query(query, values);
    return result.rows;
};

exports.create = async ({ title, description, status, user_id }) => {
    const result = await db.query(
        'INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, status, user_id]
    );
    return result.rows[0];
};

exports.update = async (id, { title, description, status, user_id }) => {
    const result = await db.query(
        'UPDATE tasks SET title = $1, description = $2, status = $3, user_id = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
        [title, description, status, user_id, id]
    );
    return result.rows[0];
};

exports.delete = async (id) => {
    const result = await db.query('DELETE FROM tasks WHERE id = $1', [id]);
    return result.rowCount > 0;
};