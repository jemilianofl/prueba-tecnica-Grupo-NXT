const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Faltan datos' });

    const hashed = await bcrypt.hash(password, 10);

    const [[existingUser]] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
        return res.status(409).json({ message: 'El email ya está registrado' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, hashed]
        );
        res.status(201).json({ message: 'Usuario registrado', userId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const [[user]] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    // 4. Envías el token al frontend
    res.json({ token, user: { id: user.id, name: user.name } });
};