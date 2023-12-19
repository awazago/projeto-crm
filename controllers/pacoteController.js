const Pacote = require('../models/pacoteModel');
const mongoose = require("mongoose");

const pacoteController = {
  listarPacotes: async (req, res) => {
    try {
      const pacotes = await Pacote.find();
      res.json(pacotes);
    } catch (error) {
      console.error('Erro ao listar pacotes de viagens:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  criarPacote: async (req, res) => {
    const { nome, meses_disponiveis, preco } = req.body;
    const precoDecimal = parseFloat(preco.replace(',', ''));
    const precoDecimal128 = mongoose.Types.Decimal128.fromString(precoDecimal.toString());

    // Armazenar o caminho da imagem
    const imagemUrl = './projeto-crm/imagens/' + req.file.originalname;

    const imagem = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    try {
      const novoPacote = await Pacote.create({
        nome,
        meses_disponiveis,
        preco: precoDecimal128,
        imagem,
        imagem_url: imagemUrl,
      });

      res.status(201).json(novoPacote);
    } catch (error) {
      console.error('Erro ao criar pacote:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  obterPacotePorId: async (req, res) => {
    const pacoteId = req.params.id;
    try {
      if (!mongoose.Types.ObjectId.isValid(pacoteId)) {
        return res.status(404).json({ error: 'Pacote de viagem não encontrado' });
      }
      const pacote = await Pacote.findById(pacoteId)
      /*if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }*/
      res.json(pacote);
    } catch (error) {
      console.error('Erro ao obter pacote por ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  atualizarPacote: async (req, res) => {
    const pacoteId = req.params.id;
    const dadosAtualizados = req.body;

    try {
        // Obter o pacote a ser atualizado
        const pacoteParaAtualizar = await Pacote.findById(pacoteId);

        // Verificar se o pacote existe
        if (!pacoteParaAtualizar) {
            return res.status(404).json({ error: 'Pacote não encontrado' });
        }

        // Atualizar os dados do pacote
        // Certifique-se de que está usando o método save() para acionar os middlewares do Mongoose
        pacoteParaAtualizar.set(dadosAtualizados);
        await pacoteParaAtualizar.save();

        res.json(pacoteParaAtualizar);
    } catch (error) {
        console.error('Erro ao atualizar pacote:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
},


  excluirPacote: async (req, res) => {
    const pacoteId = req.params.id;

    try {
        // Obter o pacote a ser excluído
        const pacoteParaExcluir = await Pacote.findById(pacoteId);

        // Verificar se o pacote existe
        if (!pacoteParaExcluir) {
            return res.status(404).json({ error: 'Pacote não encontrado' });
        }

        // Obter o caminho da imagem do pacote a ser excluído
        const imagemUrl = pacoteParaExcluir.imagem_url;

        // Excluir o pacote
        const pacoteExcluido = await Pacote.findByIdAndRemove(pacoteId);

        // Excluir a imagem se o pacote for excluído com sucesso
        if (pacoteExcluido) {
            // Lógica para excluir a imagem
            const fs = require('fs');
            fs.unlinkSync(imagemUrl); // Isso exclui o arquivo

            res.sendStatus(204); // Envie o status 204 (No Content) se tudo estiver bem
        } else {
            res.status(500).json({ error: 'Erro ao excluir pacote' });
        }
    } catch (error) {
        console.error('Erro ao excluir pacote:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
  
};

module.exports = pacoteController;
