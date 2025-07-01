// =======================
// Importação de módulos
// ======================= 
/*Qual é a diferença de import e require ?  */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// =======================
// Inicialização do app
// =======================
const app = express();
app.use(cors());
app.use(express.urlencoded({
  extended: true                                                    //Pegar informações do formualrio HTML
}));
app.use(express.json());

// =======================
// Configuração de arquivos estáticos
// =======================
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// Importação dos Controllers 
// =======================

const urlControllers = require('./controllers/UrlController');

// =======================
// Rotas
// =======================
  //app.get('/', urlControllers.Page)
  //app.post('/', urlControllers.PagePost);
  //QUal é a difernça de route e {reoute} ?
const route = require('./routes/urlRoutes');
app.use('/', route)

// =======================
// Conexão com o banco de dados
// =======================
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/EncurtandoURL';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado ao MongoDB com sucesso!');
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Conectado ao MongoDB: ${uri}`);
  });
})
.catch(err => {
  console.error('Erro ao conectar no MongoDB:', err);
});
