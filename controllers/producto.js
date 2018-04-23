'use strict'

//file sistem, libreria para poder trabajar con sistema de ficheros
var fs = require('fs');
//accerder a rutas de nuestro sistema de archivos
var path = require('path');
//modelos
var User = require('../models/user');
var Producto = require('../models/producto');

//acciones

function pruebas(req, res){
	res.status(200).send({
		message: 'probando el controlador de producto y la acción',
		user: req.user
	});
}
module.exports = {
  pruebas
};
