const Cliente = require('../models/clienteModel');
const Pacote = require('../models/pacoteModel');
const Usuario = require('../models/usuarioModel');

class VendaService {
    static async validarVendaData(clienteId, pacoteId, usuarioId) {
        try {
            const clienteExistente = await Cliente.findById(clienteId);
            const pacoteExistente = await Pacote.findById(pacoteId);
            const usuarioExistente = await Usuario.findById(usuarioId);

            if (!clienteExistente || !pacoteExistente || !usuarioExistente) {
                return { valid: false, message: 'Cliente, pacoteViagem ou usuário não encontrado.' };
            }

            return { valid: true, clienteExistente, pacoteExistente, usuarioExistente };
        } catch (error) {
            console.error('Erro ao validar dados da venda:', error);
            return { valid: false, message: 'Erro interno ao validar dados da venda' };
        }
    }
}

module.exports = VendaService;
