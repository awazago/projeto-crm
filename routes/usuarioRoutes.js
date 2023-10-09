const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para listar todos os usuarios
router.get('/', usuarioController.listarUsuarios);

// Rota para criar um novo usuario
router.post('/', usuarioController.criarUsuario);
// Rota para login de um usuario
router.post('/login', usuarioController.login);

// Rota para obter detalhes de um usuario pelo ID
router.get('/:id', usuarioController.obterUsuarioPorId);

// Rota para atualizar um usuario pelo ID
router.put('/:id', usuarioController.atualizarUsuario);

// Rota para excluir um usuario pelo ID
router.delete('/:id', usuarioController.excluirUsuario);

module.exports = router;

