'use strict'

//file sistem, libreria para poder trabajar con sistema de ficheros
var fs = require('fs');
//accerder a rutas de nuestro sistema de archivos
var path = require('path');
//modelos


var User = require('../models/user');
var Producto = require('../models/producto');
var Cliente = require('../models/cliente');
var Movimientos = require('../models/movimientos');
var moment = require('moment');


//acciones

function pruebas(req, res){
	res.status(200).send({
		message: 'probando el controlador de producto y la acción',
		user: req.user
	});
}
function guardarCliente(req, res){
	var cliente = new Cliente();
	var params = req.body;

	if(params.rut && params.razonSocial && params.rubro && params.nombre &&
	 params.direccion && params.contacto && params.correo && params.telefono && params.fax){
		 cliente.rut = params.rut;
		 cliente.razonSocial = params.razonSocial;
	  cliente.rubro = params.rubro;
		 cliente.nombre = params.nombre;
		 cliente.direccion = params.direccion;
		 cliente.contacto = params.contacto;
		 cliente.correo = params.correo;
		cliente.telefono = params.telefono;
		 cliente.fax = params.fax;


		cliente.save((err, clienteStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!clienteStored){
					res.status(404).send({message: 'No se guardo cliente'});
				}else{
					res.status(200).send({cliente: clienteStored});
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
function getClientes(req, res){
	Cliente.find({}).exec((err, clientes) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!clientes){
				res.status(404).send({message: 'No hay clientes'});
			}else{
				res.status(200).send({
					clientes
				});
			}
		}
	});

}

//buscar 1 producto especifico
function getCliente(req, res){
	var clienteId = req.params.id;

	Cliente.findById(clienteId).exec((err, cliente) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!cliente){
				res.status(404).send({message: 'No existe producto'});
			}else{
				res.status(200).send({
					cliente
				});
			}
		}
	});
}

//borrar cliente
function deleteCliente(req, res){
	var clienteId = req.params.id;
		Cliente.findByIdAndRemove(clienteId, (err, clienteRemoved) => {
			if(err){
				res.status(500).send({message: 'error en la petición'});
			}else{
				if(!clienteRemoved){
					res.status(404).send({message: 'No se a podido borrar cliente'});
				}else{
					res.status(200).send({cliente: clienteRemoved});
				}
			}
		});
}

//actualizar cliente
function updateCliente(req, res){
	var clienteId = req.params.id;
	var update = req.body;
	Producto.findByIdAndUpdate(clienteId, update, {new:true} ,(err, clienteUpdated) => {
		if(err){
			 res.status(500).send({
				 message: 'Error al actualizar producto'
			 });
		}else{
			if(!clienteUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el producto'});
			}else{
				res.status(200).send({cliente: clienteUpdated});
			}
		}
	});
		}







module.exports = {
  guardarCliente,
	pruebas,
	getClientes,
	getCliente,
	deleteCliente,
	updateCliente


};
