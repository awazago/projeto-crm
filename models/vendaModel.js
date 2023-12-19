const mongoose = require("mongoose");

const vendaSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente'
    },
    pacote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pacote'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    mes: String,
    dias: Number,
    preco: Number
});

module.exports = mongoose.model('venda', vendaSchema);
