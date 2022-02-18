'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir:'./uploads/producto' });

api.get('/pruebas-del-producto', md_auth.ensureAuth, ProductoController.pruebas);
api.post('/guardar-producto', ProductoController.guardarProducto);
api.get('/productos', ProductoController.getProductos);
api.get('/producto/:id', ProductoController.getProducto);
api.get('/productoUltimo', ProductoController.getProductoUltimo);
api.get('/productosuma', ProductoController.getProductoSuma);
api.delete('/eliminar-producto/:id', ProductoController.deleteProducto);
api.post('/upload-image-producto/:id', [md_auth.ensureAuth, md_upload], ProductoController.uploadImage);
api.get('/get-image-producto/:imageFile', ProductoController.getImageFile);
api.put('/editarProducto/:id', ProductoController.updateProducto);
api.put('/editarcantidad/:id', ProductoController.updateProductoCantidad);
api.put('/editarcantidadEgreso/:id', ProductoController.updateProductoCantidadEgreso);



module.exports = api;
