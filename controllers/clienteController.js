const Cliente = require('../models/clienteModel');

const clienteController = {
  listarClientes: async (req, res) => {
    try {
      const clientes = await Cliente.find();
      res.json(clientes);
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  criarCliente: async (req, res) => {
    const novoCliente = req.body;
    try {
      const cliente = await Cliente.create(novoCliente);
      res.status(201).json(cliente);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  obterClientePorId: async (req, res) => {
    const clienteId = req.params.id;
    try {
      const cliente = await Cliente.findById(clienteId);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      console.error('Erro ao obter cliente por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  atualizarCliente: async (req, res) => {
    const clienteId = req.params.id;
    const dadosAtualizados = req.body;
    try {
      const cliente = await Cliente.findByIdAndUpdate(clienteId, dadosAtualizados, { new: true });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  excluirCliente: async (req, res) => {
    const clienteId = req.params.id;
    try {
      const clienteExcluido = await Cliente.findByIdAndRemove(clienteId);
      if (!clienteExcluido) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.sendStatus(204);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
};

module.exports = clienteController;
