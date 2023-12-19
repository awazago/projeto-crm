const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

// Rota para listar todos os usuários
router.get('/', vendaController.listarVendas);

// Rota para criar um novo pacote (inclui upload de imagem)
router.post('/', vendaController.criarVenda);

// Rota para obter detalhes de um pacote pelo ID
router.get('/:id', vendaController.obterVendaPorId);

// Rota para atualizar um pacote pelo ID
router.put('/:id', vendaController.atualizarVenda);

// Rota para excluir um pacote pelo ID
router.delete('/:id', vendaController.excluirVenda);

module.exports = router;