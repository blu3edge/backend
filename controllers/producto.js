'use strict'

//file sistem, libreria para poder trabajar con sistema de ficheros
var fs = require('fs');
//accerder a rutas de nuestro sistema de archivos
var path = require('path');
//modelos


var User = require('../models/user');
var Producto = require('../models/producto');
var Proveedor = require('../models/proveedor');
var Movimientos = require('../models/movimientos');
var moment = require('moment');


//acciones

function pruebas(req, res){
	res.status(200).send({
		message: 'probando el controlador de producto y la acción',
		user: req.user
	});
}
function guardarProducto(req, res){
	var producto = new Producto();
	var params = req.body;

	if(params.codigo && params.nombre && params.origenenvio && params.tipo &&
	 params.fechaAdquisicion && params.cantidad && params.valor){
		 producto.codigo = params.codigo;
		producto.nombre = params.nombre;
		producto.image = null;
		producto.fechaingreso = moment().format('L');
		producto.numGuia = params.numGuia;
		producto.origenenvio = params.origenenvio;
		producto.descripcion = params.descripcion;
		producto.marca = params.marca;
		producto.modelo = params.modelo;
		producto.tipo = params.tipo;
		producto.fechaAdquisicion = params.fechaAdquisicion;
		producto.cantidad = params.cantidad;
		producto.valor = params.valor;
		producto.total = params.cantidad * params.valor;
		producto.proveedor = params.proveedor;

		producto.save((err, productoStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!productoStored){
					res.status(404).send({message: 'No se han guardado productos'});
				}else{
					res.status(200).send({producto: productoStored});
				}
			}
		});

	}else{
		res.status(200).send({
			message: 'Debe ingresar datos obligatorios'
						});
	}

}
//obtener todos los productos
function getProductos(req, res){
	Producto.find({}).exec((err, productos) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!productos){
				res.status(404).send({message: 'No hay productos'});
			}else{
				res.status(200).send({
					productos
				});
			}
		}
	});

}

//buscar 1 producto especifico
function getProducto(req, res){
	var productoId = req.params.id;

	Producto.findById(productoId).populate({path: 'proveedor'}).exec((err, producto) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!producto){
				res.status(404).send({message: 'No existe producto'});
			}else{
				res.status(200).send({
					producto
				});
			}
		}
	});
}



function getProductoSuma(req, res){
	Producto.sum("cantidad", function (err, result) {
    if (err) {
        next(err);
    } else {
        res.json(result);
    }
});
}

//borrar producto
function deleteProducto(req, res){
	var productoId = req.params.id;
		Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
			if(err){
				res.status(500).send({message: 'error en la petición'});
			}else{
				if(!productoRemoved){
					res.status(404).send({message: 'No se a podido borrar producto'});
				}else{
					res.status(200).send({producto: productoRemoved});
				}
			}
		});
}

//actualizar productos
function updateProducto(req, res){
	var prodId = req.params.id;
	var update = req.body;
	Producto.findByIdAndUpdate(prodId, update, {new:true} ,(err, productoUpdated) => {
		if(err){
			 res.status(500).send({
				 message: 'Error al actualizar producto'
			 });
		}else{
			if(!productoUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el producto'});
			}else{
				res.status(200).send({producto: productoUpdated});
			}
		}
	});
		}



function getProductoUltimo(req, res){
		Producto.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
		  console.log( post );
		});
}


//subida de imagen de producto
function uploadImage(req, res){
	var productoId = req.params.id;
	var file_name = 'no subido..';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

var ext_split = file_name.split('\.');
var file_ext = ext_split[1];
if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
	
	Producto.findByIdAndUpdate(productoId, {image: file_name}, {new:true}, (err, productoUpdated) => {
		if(err){
			 res.status(500).send({
				 message: 'Error al actualizar producto'
			 });
		}else{
			if(!productoUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el producto'});
			}else{
				res.status(200).send({producto: productoUpdated, image: file_name});
			}
		}
	});

			}else{
				//borrar archivo subido de formato no permitido
				fs.unlink(file_path, (err) => {
					if(err){
							res.status(200).send({message: 'Formato de no permitido y se borro archivo'});
					}else{
							res.status(200).send({message: 'Formato de no permitido'});
					}
				});

			}

}else{
		res.status(200).send({message: 'No se han subido archivos'});
	}
}

//metodo para retornar imagen del usuario

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/producto/'+imageFile;

fs.exists(path_file, function(exists){
	if(exists){
		res.sendFile(path.resolve(path_file));
	}else{
		res.status(404).send({message: 'no existe imagen'});
	}

});
}
//actualizar cantidad de producto con parametro
function updateProductoCantidad(req, res){
	var prodId = req.params.id;
	

	Producto.findByIdAndUpdate(prodId, {$inc: {cantidad: req.body.cantidad}}, (err, productoUpdated) => {
		if(err){
			 res.status(500).send({
				 message: 'Error al actualizar producto'
			 });
		}else{
			if(!productoUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el producto'});
			}else{
				res.status(200).send({producto: productoUpdated});
			}
		}
	});
		}
//egreso de cantidad
		function updateProductoCantidadEgreso(req, res){
			var prodId = req.params.id;
			
		
			Producto.findByIdAndUpdate(prodId, {$inc: {cantidad: -req.body.cantidad}}, (err, productoUpdated) => {
				if(err){
					 res.status(500).send({
						 message: 'Error al actualizar producto'
					 });
				}else{
					if(!productoUpdated){
						res.status(404).send({message: 'No se ha podido actualizar el producto'});
					}else{
						res.status(200).send({producto: productoUpdated});
					}
				}
			});
				}


module.exports = {
  guardarProducto,
	pruebas,
	getProductos,
	getProducto,
	getProductoSuma,
	deleteProducto,
	updateProducto,
	getProductoUltimo,
	uploadImage,
	getImageFile,
	updateProductoCantidad,
	updateProductoCantidadEgreso


};
