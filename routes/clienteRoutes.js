const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rota para listar todos os clientes
router.get('/', clienteController.listarClientes);

// Rota para criar um novo cliente
router.post('/', clienteController.criarCliente);

// Rota para obter detalhes de um cliente pelo ID
router.get('/:id', clienteController.obterClientePorId);

// Rota para atualizar um cliente pelo ID
router.put('/:id', clienteController.atualizarCliente);

// Rota para excluir um cliente pelo ID
router.delete('/:id', clienteController.excluirCliente);

module.exports = router;

