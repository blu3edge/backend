'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');



api.post('/guardar-cliente', ClienteController.guardarCliente);
api.get('/clientes', ClienteController.getClientes);
api.get('/cliente/:id', ClienteController.getCliente);
api.delete('/eliminar-cliente/:id', ClienteController.deleteCliente);
api.put('/editar-cliente/:id', ClienteController.updateCliente);

module.exports = api;
