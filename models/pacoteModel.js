const mongoose = require("mongoose");

const pacoteSchema = new mongoose.Schema({
    nome: String,
    meses_disponiveis: Array,
    preco: {
        type: mongoose.Schema.Types.Decimal128,
        min: 0,
        max: 99999999.99 // Defina os limites conforme necessário
    },
    imagem: {
        data: Buffer,
        contentType: String
    },
    imagem_url: String,
});

module.exports = mongoose.model('pacote', pacoteSchema);