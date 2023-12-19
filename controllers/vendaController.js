const Cliente = require('../models/clienteModel');
const Pacote = require('../models/pacoteModel');
const Usuario = require('../models/usuarioModel');
const Venda = require('../models/vendaModel');
const VendaService = require('../service/vendaService');

const vendaController = {
    criarVenda: async (req, res) => {
        try {
            const { cliente, pacote, usuario, mes, dias, preco } = req.body;

            // Validar os IDs e obter as entidades relacionadas
            const validation = await VendaService.validarVendaData(cliente, pacote, usuario);

            if (!validation.valid) {
                return res.status(404).json({ error: validation.message });
            }

            const { clienteExistente, pacoteExistente, usuarioExistente } = validation;

            // Criar a venda
            const novaVenda = await Venda.create({
                cliente: clienteExistente,
                pacote: pacoteExistente,
                usuario: usuarioExistente,
                mes,
                dias,
                preco,
            });

            res.status(201).json(novaVenda);
        } catch (error) {
            console.error('Erro ao criar venda:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

  listarVendas: async (req, res) => {
    try {
      const vendas = await Venda.find()
        .populate('cliente', 'nome')
        .populate('pacote', 'nome dias preco')
        .populate('usuario', 'nome');

      res.json(vendas);
    } catch (error) {
      console.error('Erro ao listar vendas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  obterVendaPorId: async (req, res) => {
    const vendaId = req.params.id;

    try {
      const venda = await Venda.findById(vendaId)
        .populate('cliente', 'nome')
        .populate('pacote', 'nome dias preco')
        .populate('usuario', 'nome');

      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }

      res.json(venda);
    } catch (error) {
      console.error('Erro ao obter venda por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  /*atualizarVenda: async (req, res) => {
    const vendaId = req.params.id;
    const dadosAtualizados = req.body;
  
    try {
      // Validar os IDs e obter as instâncias das entidades relacionadas
      const validation = await VendaService.validarVendaData(
        dadosAtualizados.cliente,
        dadosAtualizados.pacote,
        dadosAtualizados.usuario
      );
  
      if (!validation.valid) {
        return res.status(404).json({ error: validation.message });
      }
  
      const { cliente: clienteExistente, pacote: pacoteExistente, usuario: usuarioExistente } = validation;
  
      // Atualizar a venda utilizando findByIdAndUpdate
      const vendaAtualizada = await Venda.findByIdAndUpdate(
        vendaId,
        {
          cliente: clienteExistente,
          pacote: pacoteExistente,
          usuario: usuarioExistente,
          mes: dadosAtualizados.mes,
          dias: dadosAtualizados.dias,
          preco: dadosAtualizados.preco,
        },
        { new: true, runValidators: true }
      )
        .populate('cliente', 'nome')  // Adicione os campos desejados
        .populate('pacote', 'nome dias preco')  // Adicione os campos desejados
        .populate('usuario', 'login');  // Adicione os campos desejados
  
      if (!vendaAtualizada) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
  
      res.json(vendaAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar venda:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },*/
  atualizarVenda: async (req, res) => {
    const vendaId = req.params.id;
    const dadosAtualizados = req.body;
  
    try {
      // Validar os IDs e obter as instâncias das entidades relacionadas
      const validation = await VendaService.validarVendaData(
        dadosAtualizados.cliente,
        dadosAtualizados.pacote,
        dadosAtualizados.usuario
      );
  
      if (!validation.valid) {
        return res.status(404).json({ error: validation.message });
      }
  
      const { cliente: clienteExistente, pacote: pacoteExistente, usuario: usuarioExistente } = validation;
  
      // Atualizar a venda utilizando findByIdAndUpdate
      const vendaAtualizada = await Venda.findByIdAndUpdate(
        vendaId,
        {
          cliente: clienteExistente,
          pacote: pacoteExistente,
          usuario: usuarioExistente,
          mes: dadosAtualizados.mes,
          dias: dadosAtualizados.dias,
          preco: dadosAtualizados.preco,
        },
        { new: true, runValidators: true }
      );
  
      if (!vendaAtualizada) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
  
      // Verificar e atualizar as instâncias de cliente, pacote e usuario
      if (clienteExistente) {
        vendaAtualizada.cliente = await Cliente.findById(clienteExistente._id).select('nome');
      }
  
      if (pacoteExistente) {
        vendaAtualizada.pacote = await Pacote.findById(pacoteExistente._id).select('nome dias preco');
      }
  
      if (usuarioExistente) {
        vendaAtualizada.usuario = await Usuario.findById(usuarioExistente._id).select('login');
      }
  
      res.json(vendaAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar venda:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  excluirVenda: async (req, res) => {
    const vendaId = req.params.id;

    try {
      // Obter a venda a ser excluída
      const vendaParaExcluir = await Venda.findById(vendaId);

      // Verificar se a venda existe
      if (!vendaParaExcluir) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }

      // Excluir a venda
      const vendaExcluida = await Venda.findByIdAndRemove(vendaId);

      if (vendaExcluida) {
        res.sendStatus(204);
      } else {
        res.status(500).json({ error: 'Erro ao excluir venda' });
      }
    } catch (error) {
      console.error('Erro ao excluir venda:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
};

module.exports = vendaController;
