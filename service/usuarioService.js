const usuarioModel = require('../models/usuarioModel')
const bcrypt = require('bcrypt')

const usuarioService = {

    criarUsuario: async (reference) => {
        const salt = bcrypt.genSaltSync()
        const senha = bcrypt.hashSync(reference.senha, salt)
        const novoUsuario = new usuarioModel({
            nome: reference.nome,
            email: reference.email,
            senha: senha,
            salt: salt
        })
        return await usuarioModel.create(novoUsuario);
    },

    login: async (login, senha) => {
       const usuario = await usuarioModel.findOne({email: login})
       if(usuario) {
            const checkSenha = bcrypt.hashSync(senha, usuario.salt)
            if(checkSenha == usuario.senha) {
                //Aqui direcionar para sistema
                return "entrou"
            }
       }
       throw new Error("Usuário ou senha inválidos") 
    }
}


module.exports = usuarioService;