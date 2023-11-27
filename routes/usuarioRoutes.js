const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarAutenticacao = require('../middleware/authMiddleware');


// Rota para login de um usuário
router.post('/login', usuarioController.login);

// Rota protegida
//router.use(verificarAutenticacao);

// Rota para listar todos os usuários
router.get('/', usuarioController.listarUsuarios);

// Rota para criar um novo usuário
router.post('/', usuarioController.criarUsuario);

// Rota para obter detalhes de um usuário pelo ID
router.get('/:id', usuarioController.obterUsuarioPorId);

// Rota para atualizar um usuário pelo ID
router.put('/:id', usuarioController.atualizarUsuario);

// Rota para excluir um usuário pelo ID
router.delete('/:id', usuarioController.excluirUsuario);

module.exports = router;
