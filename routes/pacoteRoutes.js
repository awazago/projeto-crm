const express = require('express');
const router = express.Router();
const pacoteController = require('../controllers/pacoteController');

// Rota para listar todos os usuários
router.get('/', pacoteController.listarPacotes);

// Rota para criar um novo pacote (inclui upload de imagem)
router.post('/', pacoteController.criarPacote);

// Rota para obter detalhes de um pacote pelo ID
router.get('/:id', pacoteController.obterPacotePorId);

// Rota para atualizar um pacote pelo ID
router.put('/:id', pacoteController.atualizarPacote);

// Rota para excluir um pacote pelo ID
router.delete('/:id', pacoteController.excluirPacote);

module.exports = router;

