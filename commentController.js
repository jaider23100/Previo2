const Comment = require('../models/Comment');

// Crear un comentario
const createComment = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newComment = new Comment({ name, email, message });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el comentario' });
    }
};

// Obtener todos los comentarios
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
};

module.exports = { createComment, getComments };
