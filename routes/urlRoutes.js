const express = require('express')
const route = express.Router();

const urlController = require('../controllers/UrlController.js');

route.get('/', urlController.Page);
route.post('/encurtar', urlController.encurtar);

route.get('/lista', urlController.lista);

//Usar POST para exvluir apenas para faciliar
route.post('/excluir', urlController.excluirUrl)

/*deixar sempre por ultmo ?*/
route.get('/:codigoCurto', urlController.redirecionar);


module.exports = route;