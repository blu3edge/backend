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
var moment = require('moment');

//guardar nota de venta

function guardarNota(req, res){
	var notadeventa = new Notadeventa();

	var params = req.body;

	if(params.numero && params.fechaEstimadaEntrega && params.cliente && params.producto &&
	 params.cantidad ){
		notadeventa.numero = params.numero;
		notadeventa.fechaEmision = moment().format('L');
		notadeventa.fechaEstimadaEntrega = params.fechaEstimadaEntrega;
		notadeventa.cliente = params.cliente;
		notadeventa.ordenDeCompra = params.ordenDeCompra;
		notadeventa.producto = params.producto;
		notadeventa.cantidad = params.cantidad;
		notadeventa.valorNeto = params.valorNeto;
		notadeventa.iva = params.iva;
		notadeventa.valorBruto = params.valorBruto;
		notadeventa.direccionDespacho = params.direccionDespacho;
		notadeventa.observacionesDespacho = params.observacionesDespacho;
		notadeventa.contacto = params.contacto;
		

		notadeventa.save((err, notaVentaStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!notaVentaStored){
					res.status(404).send({message: 'No se han guardado nota de venta'});
				}else{
					res.status(200).send({notadeventa: notaVentaStored});
				}
			}
		});

		
		

	}else{
		res.status(200).send({
			message: 'Debe ingresar datos obligatorios'
						});
	}

}

//obtener todas las notas de ventas
function getNotas(req, res){
	Notadeventa.find({}).exec((err, notadeventas) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!notadeventas){
				res.status(404).send({message: 'No hay notas de ventas'});
			}else{
				res.status(200).send({
					notadeventas
				});
			}
		}
	});

}

//obtener una nota de venta

function getNota(req, res){
	var notaId = req.params.id;

	Notadeventa.findById(notaId).exec((err, notadeventa) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!notadeventa){
				res.status(404).send({message: 'No existe nota de venta'});
			}else{
				res.status(200).send({
					notadeventa
				});
			}
		}
	});
}

//borrar nota de venta
function deleteNota(req, res){
	var notaId = req.params.id;
		Notadeventa.findByIdAndRemove(notaId, (err, notadeventaRemoved) => {
			if(err){
				res.status(500).send({message: 'error en la petición'});
			}else{
				if(!notadeventaRemoved){
					res.status(404).send({message: 'No se borro nota de venta'});
				}else{
					res.status(200).send({notadeventa: notadeventaRemoved});
				}
			}
		});
}


module.exports = {
  guardarNota,
	getNotas,
	getNota,
	deleteNota
};
