const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    salt: String
});

module.exports = mongoose.model('usuario', usuarioSchema);