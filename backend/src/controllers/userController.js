const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.findAll();
        res.json(users);
    } catch {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

exports.createUser = async (req, res) => {
    const { name } = req.body;
    console.log("Creando usuario con:", name); // <-- agregar esto

    if (!name) return res.status(400).json({ message: 'El nombre es obligatorio' });

    try {
        const user = await userModel.create(name);
        res.status(201).json(user);
    } catch (error) {
        console.error("Error en createUser:", error); // <-- log de error
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'El nombre es obligatorio' });

    try {
        const user = await userModel.update(id, name);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch {
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await userModel.delete(id);
        if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};