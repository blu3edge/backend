'use strict'

//file sistem, libreria para poder trabajar con sistema de ficheros
var fs = require('fs');
//accerder a rutas de nuestro sistema de archivos
var path = require('path');
//modelos
var User = require('../models/user');
var Producto = require('../models/producto');
var Proveedor = require('../models/proveedor');
var Notadeventa = require('../models/notadeventa');
var Movimientos = require('../models/movimientos');
var moment = require('moment');

//guardar movimientos
function guardarMovimientoIngreso(req, res){
	var movimientos = new Movimientos();
	var params = req.body;

	if( params.producto && params.cantidad){
		    movimientos.fecha = moment().format('L');
		 		movimientos.usuario = params.usuario;
		 		movimientos.tipo = params.tipo;
		 		movimientos.subtipo = params.subtipo;
		 		movimientos.producto = params.producto;
				movimientos.cantidad = params.cantidad;
	//guardar movimientos
		movimientos.save((err, movimientosStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!movimientosStored){
					res.status(404).send({message: 'No se han guardado movimientos'});
				}else{
					res.status(200).send({movimientos: movimientosStored});
				}
			}
		});

		function updateProducto(req, res){
			var prodId = req.params.producto;
			var update = req.body;
			Producto.findByIdAndUpdate(prodId, update, { $set: { cantidad: ''+params.cantidad }} ,(err, productoUpdated) => {
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

	}else{
		res.status(200).send({
			message: 'Debe ingresar datos obligatorios'
						});
	}

}

//obtener todos los movimientos
function getMovimientos(req, res){
	Producto.find({}).exec((err, movimientos) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!movimientos){
				res.status(404).send({message: 'No hay movimientos'});
			}else{
				res.status(200).send({
					movimientos
				});
			}
		}
	});

}

//buscar 1 movimiento especifico
function getMovimiento(req, res){
	var movimientoId = req.params.id;

	Producto.findById(movimientoId).populate({path :'usuario'}).populate({path :'producto'}).populate({path :'proveedor'}).pupulate({path :'cliente'}).exec((err, movimiento) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!movimiento){
				res.status(404).send({message: 'No existe movimiento'});
			}else{
				res.status(200).send({
					movimiento
				});
			}
		}
	});
}



//borrar movimiento
function deleteMovimiento(req, res){
	var movimientoId = req.params.id;
		Producto.findByIdAndRemove(movimientoId, (err, movimientoRemoved) => {
			if(err){
				res.status(500).send({message: 'error en la petición'});
			}else{
				if(!movimientoRemoved){
					res.status(404).send({message: 'No se a podido borrar movimiento'});
				}else{
					res.status(200).send({producto: movimientoRemoved});
				}
			}
		});
}




module.exports = {
  guardarMovimientoIngreso,
	getMovimientos,
	getMovimiento,
	deleteMovimiento
};
