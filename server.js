const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/projectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

// Modelos de datos
const Comment = mongoose.model('Comment', new mongoose.Schema({
    username: String,
    email: String,
    message: String,
}));

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
}));

const Task = mongoose.model('Task', new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false }
}));

// Rutas para comentarios
app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).send(comment);
});

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

// Rutas para usuarios
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

// Rutas para tareas
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
