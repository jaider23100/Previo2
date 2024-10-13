const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

// Ruta para crear una tarea
router.post('/', createTask);

// Ruta para obtener todas las tareas
router.get('/', getTasks);

// Ruta para actualizar una tarea
router.put('/:id', updateTask);

// Ruta para eliminar una tarea
router.delete('/:id', deleteTask);

module.exports = router;
