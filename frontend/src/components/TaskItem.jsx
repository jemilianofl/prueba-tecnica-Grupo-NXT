import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
    return (
        <div className="glass task-item">
            <div className="task-content">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <small><strong>Estado:</strong> {task.status}</small><br />
                <small><strong>Usuario ID:</strong> {task.user_id}</small>
            </div>
            <div className="task-actions">
                <button onClick={() => onEdit(task)}>Editar</button>
                <button onClick={() => onDelete(task.id)} className="danger">Eliminar</button>
            </div>
        </div>
    );
};

export default TaskItem;