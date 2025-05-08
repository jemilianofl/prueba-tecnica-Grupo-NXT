const db = require('../config/db');

exports.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM users ORDER BY id ASC');
    return rows;
};

exports.create = async (name) => {
    const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
};

exports.update = async (id, name) => {
    const [result] = await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id]);
    return result.affectedRows > 0 ? { id, name } : null;
};

exports.delete = async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
