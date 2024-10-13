const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Agregar método para autenticar usuario
userSchema.statics.authenticate = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
        // Aquí deberías usar bcrypt para comparar las contraseñas
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return user;
        }
    }
    return null;
};

module.exports = mongoose.model('User', userSchema);
