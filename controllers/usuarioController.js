const usuarioService = require('../service/usuarioService')
const usuarioModel = require('../models/usuarioModel')

const usuarioController = {
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await usuarioModel.find()
      res.json(usuarios)
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  criarUsuario: async (req, res) => {
    const novoUsuario = req.body;
    try {
      const usuario = await usuarioService.criarUsuario(novoUsuario);
      res.status(201).json(usuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  login: async (req, res, next) => {
    const credenciais = req.body;
    try {
      const response = await usuarioService.login(credenciais.email, credenciais.senha)   
      res.status(200).send(response)
    } catch (error) {
      res.status(403).send(error)
    }
  },

  obterUsuarioPorId: async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const usuario = await usuarioModel.findById(usuarioId)
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error('Erro ao obter usuário por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  atualizarUsuario: async (req, res) => {
    const usuarioId = req.params.id;
    const dadosAtualizados = req.body;
    try {
      const usuario = await usuarioModel.findByIdAndUpdate(usuarioId, dadosAtualizados, { new: true });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  excluirUsuario: async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const usuarioExcluido = await usuarioModel.findByIdAndRemove(usuarioId);
      if (!usuarioExcluido) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.sendStatus(204);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
};

module.exports = usuarioController;
