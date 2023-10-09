const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    nome: String,
    cpf: String,
    email: String,
    telefone: String,
    cep: String,
    logradouro: String,
    numero: Number,
    complemento: String,
    bairro: String, 
    cidade: String, 
    estado: String,
});

module.exports = mongoose.model('cliente', clienteSchema);