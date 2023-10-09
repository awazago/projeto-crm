const pacote = require('../models/pacoteModel');

const pacoteController = {
  listarPacotes: async (req, res) => {
    try {
      const pacotes = await pacote.find();
      res.json(pacotes);
    } catch (error) {
      console.error('Erro ao listar pacotes de viagens:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  
};

module.exports = pacoteController;
