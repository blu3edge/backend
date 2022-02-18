'use strict'

var express = require('express');
var NotaController = require('../controllers/notadeventa');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir:'./uploads/producto' });

api.post('/guardar-nota', NotaController.guardarNota);
api.get('/notasDeVenta', NotaController.getNotas);
api.get('/notadeventa/:id', NotaController.getNota);
api.delete('/eliminar-nota/:id', NotaController.deleteNota);


module.exports = api;
