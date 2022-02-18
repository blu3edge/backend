'use strict'

//file sistem, libreria para poder trabajar con sistema de ficheros
var fs = require('fs');
//accerder a rutas de nuestro sistema de archivos
var path = require('path');
//modelos
var User = require('../models/user');
var Producto = require('../models/producto');
var Proveedor = require('../models/proveedor');


//acciones

function pruebas(req, res){
	res.status(200).send({
		message: 'probando el controlador de proveedor y la acción',
		user: req.user
	});
}
function guardarProveedor(req, res){
	var proveedor = new Proveedor();

	var params = req.body;

	if(params.rut && params.razonSocial && params.nombre && params.direccion && params.contacto &&
	 params.correo && params.telefono && params.fax){
		 
     proveedor.rut = params.rut;
     proveedor.razonSocial = params.razonSocial;
     proveedor.rubro = params.rubro;
     proveedor.nombre = params.nombre;
     proveedor.image = null;
     proveedor.direccion = params.direccion;
     proveedor.contacto = params.contacto;
     proveedor.correo = params.correo;
     proveedor.telefono = params.telefono;
     proveedor.fax = params.fax;

	//	producto.proveedor = req.proveedor.sub;

		proveedor.save((err, proveedorStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!proveedorStored){
					res.status(404).send({message: 'No se han guardado productos'});
				}else{
					res.status(200).send({proveedor: proveedorStored});
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
function getProveedores(req, res){
Proveedor.find({}).exec((err, proveedors) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!proveedors){
				res.status(404).send({message: 'No hay proveedores'});
			}else{
				res.status(200).send({
					proveedors
				});
			}
		}
	});

}
//buscar 1 producto especifico
function getProveedor(req, res){
	var proveedorId = req.params.id;

	Proveedor.findById(proveedorId).exec((err, proveedor) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!proveedor){
				res.status(404).send({message: 'No existe'});
			}else{
				res.status(200).send({
					proveedor
				});
			}
		}
	});
}

function deleteProveedor(req, res){
	var proveedorId = req.params.id;
		Proveedor.findByIdAndRemove(proveedorId, (err, proveedorRemoved) => {
			if(err){
				res.status(500).send({message: 'error en la petición'});
			}else{
				if(!proveedorRemoved){
					res.status(404).send({message: 'No se a podido borrar proveedor'});
				}else{
					res.status(200).send({proveedor: proveedorRemoved});
				}
			}
		});
}

//actualizar productos
function updateProveedor(req, res){
	var proveeId = req.params.id;
	var update = req.body;
	Proveedor.findByIdAndUpdate(proveeId, update, {new:true} ,(err, proveedorUpdated) => {
		if(err){
			 res.status(500).send({
				 message: 'Error al actualizar proveedor'
			 });
		}else{
			if(!proveedorUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el proveedor'});
			}else{
				res.status(200).send({proveedor: proveedorUpdated});
			}
		}
	});
		}


//buscar 1 producto especifico

module.exports = {
  guardarProveedor,
	pruebas,
	getProveedores,
	getProveedor,
	deleteProveedor,
	updateProveedor
};
