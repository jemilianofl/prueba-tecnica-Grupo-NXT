const taskModel = require('../models/taskModel');
const validStatuses = ['pendiente', 'en curso', 'completada'];

exports.getAllTasks = async (req, res) => {
    const { userId, status } = req.query;

    try {
        const tasks = await taskModel.findAll(userId, status);
        res.json(tasks);
    } catch {
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
};

exports.createTask = async (req, res) => {
    const { title, description, status = 'pendiente', user_id } = req.body;
    if (!title || !user_id || !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Datos inválidos' });
    }

    try {
        const task = await taskModel.create({ title, description, status, user_id });
        res.status(201).json(task);
    } catch {
        res.status(500).json({ message: 'Error al crear tarea' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, user_id } = req.body;
    if (!title || !user_id || !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Datos inválidos' });
    }

    try {
        const task = await taskModel.update(id, { title, description, status, user_id });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch {
        res.status(500).json({ message: 'Error al actualizar tarea' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await taskModel.delete(id);
        if (!deleted) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch {
        res.status(500).json({ message: 'Error al eliminar tarea' });
    }
};