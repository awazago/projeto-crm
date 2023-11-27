const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')

// Rota para criar um novo cliente
router.post('/', usuarioController.login)

module.exports = router