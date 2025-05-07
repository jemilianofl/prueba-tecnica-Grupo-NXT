const db = require('../config/db');

exports.findAll = async () => {
    const result = await db.query('SELECT * FROM users ORDER BY id ASC');
    return result.rows;
};

exports.create = async (name) => {
    const result = await db.query(
        'INSERT INTO users (name) VALUES ($1) RETURNING *',
        [name]
    );
    return result.rows[0];
};

exports.update = async (id, name) => {
    const result = await db.query(
        'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
        [name, id]
    );
    return result.rows[0];
};

exports.delete = async (id) => {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount > 0;
};