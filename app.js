const express = require('express');
const mongoose = require('mongoose');
const database = require('./database')
const bodyParser = require('body-parser');
const cors = require('cors');
const clienteRoutes = require('./routes/clienteRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Conectar ao banco de dados MongoDB
//mongoose.connect('mongodb://localhost/projeto-crm', {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//});

//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
//db.once('open', () => {
//  console.log('Conexão com o MongoDB estabelecida com sucesso.');
//});

// Roteamento para clientes
app.use('/clientes', clienteRoutes);
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
