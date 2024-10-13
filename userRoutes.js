const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('backend/models/User.js');
const router = express.Router();

// Registro de usuario
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    
    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);

    if (user) {
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } else {
        res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
});

module.exports = router;
