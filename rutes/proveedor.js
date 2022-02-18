'use strict'

var express = require('express');
var ProveedorController = require('../controllers/proveedor');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir:'./uploads/producto' });

api.get('/pruebas-del-producto', md_auth.ensureAuth, ProveedorController.pruebas);
api.post('/guardar-proveedor', ProveedorController.guardarProveedor);
api.get('/proveedores', ProveedorController.getProveedores);
api.get('/proveedor/:id', ProveedorController.getProveedor);
api.put('/actualizarproveedor/:id', ProveedorController.updateProveedor);
api.delete('/borrarprove/:id', ProveedorController.deleteProveedor);


module.exports = api;
