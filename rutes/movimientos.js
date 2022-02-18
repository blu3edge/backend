'use strict'

var express = require('express');
var MovimientosController = require('../controllers/movimientos');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir:'./uploads/producto' });

api.put('/guardar-movimientoIngreso', MovimientosController.guardarMovimientoIngreso);
api.get('/movimientos', MovimientosController.getMovimientos);
api.get('/movimiento/:id', MovimientosController.getMovimiento);
api.delete('/eliminar-movimiento/:id', MovimientosController.deleteMovimiento);

module.exports = api;
