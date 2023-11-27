// authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtSecret = 'seuSegredoJWT';

function verificarAutenticacao(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    console.log('Token não fornecido');
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.usuario._id;
    console.log('Autenticação bem-sucedida. UserID:', req.userId);
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = verificarAutenticacao; // Exporte a função diretamente, não como um objeto
