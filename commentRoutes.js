const express = require('express');
const router = express.Router();
const { createComment, getComments } = require('../controllers/commentController');

// Ruta para crear un comentario
router.post('/', createComment);

// Ruta para obtener todos los comentarios
router.get('/', getComments);

module.exports = router;
