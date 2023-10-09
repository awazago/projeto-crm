const mongoose = require("mongoose");

const pacoteSchema = new mongoose.Schema({
    nome: String,
    meses_disponiveis: Array,
    preco: Number,
    imagem_pacote: Buffer
});

module.exports = mongoose.model('pacote', pacoteSchema);