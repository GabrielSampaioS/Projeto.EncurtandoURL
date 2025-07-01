const express = require('express')
const route = express.Router();

const urlController = require('../controllers/UrlController.js');

route.get('/', urlController.Page);
route.post('/encurtar', urlController.encurtar);
route.get('/:codigoCurto', urlController.redirecionar);

module.exports = route;