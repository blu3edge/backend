'use strict'

//file sistem, libreria para poder trabajar con sistema de ficheros
var fs = require('fs');
//accerder a rutas de nuestro sistema de archivos
var path = require('path');
//modelos


var User = require('../models/user');
var Tarea = require('../models/tarea');
var moment = require('moment');


//acciones


function guardarTarea(req, res){
	var tarea = new Tarea();
	var params = req.body;

	if( params.titulo && params.descripcion && params.fechadeentrega){
         tarea.user = params.user;
         tarea.titulo = params.titulo;
         tarea.descripcion = params.descripcion;
         tarea.fechadecreacion = moment().format('L');
		 tarea.fechadeentrega = params.fechadeentrega;
		 tarea.horadeentrega = params.horadeentrega;
         tarea.estatus = 'Asignada';
	
		tarea.save((err, tareaStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!tareaStored){
					res.status(404).send({message: 'No se han guardado tareas'});
				}else{
					res.status(200).send({tarea: tareaStored});
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
function getTareas(req, res){
	Tarea.find({}).populate({path: 'user'}).exec((err, tareas) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!tareas){
				res.status(404).send({message: 'No hay tareas'});
			}else{
				res.status(200).send({
					tareas
				});
			}
		}
	});

}

//obtener todos los productos
function getTareasUser(req, res){
	
	Tarea.find({user: req.params.id}).populate({path: 'user'}).exec((err, tareas) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!tareas){
				res.status(404).send({message: 'No hay tareas'});
			}else{
				res.status(200).send({
					tareas
				});
			}
		}
	});

}
//Buscar tareas asignadas
function getTareasEstatus(req, res){
	
	Tarea.find({estatus: 'Asignada'}).populate({path: 'user'}).exec((err, tareas) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!tareas){
				res.status(404).send({message: 'No hay tareas'});
			}else{
				res.status(200).send({
					tareas
				});
			}
		}
	});

}

//buscar 1 producto especifico
function getTarea(req, res){
	var tareaId = req.params.id;

	Tarea.findById(tareaId).populate({path: 'user'}).exec((err, tarea) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!tarea){
				res.status(404).send({message: 'No existe tarea'});
			}else{
				res.status(200).send({
					tarea
				});
			}
		}
	});
}



//borrar producto
function deleteTarea(req, res){
	var tareaId = req.params.id;
		Tarea.findByIdAndRemove(tareaId, (err, tareaRemoved) => {
			if(err){
				res.status(500).send({message: 'error en la petición'});
			}else{
				if(!tareaRemoved){
					res.status(404).send({message: 'No se a podido borrar tarea'});
				}else{
					res.status(200).send({tarea: tareaRemoved});
				}
			}
		});
}

//actualizar productos
function updateTarea(req, res){
	var tareaId = req.params.id;
	var update = req.body;
	
	Tarea.findByIdAndUpdate(tareaId, update, {new:true} ,(err, tareaUpdated) => {
	if(err){
			 res.status(500).send({
				 message: 'Error al actualizar producto'
			 });
	}else{
			if(!tareaUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el producto'});
			}else{
				res.status(200).send({tarea: tareaUpdated});
		}
	}
	});
		}


//modifica tarea en proceso

		function updateTareaProceso(req, res){
			var tareaId = req.params.id;
		
			Tarea.findByIdAndUpdate(tareaId,{estatus :'En Proceso'} ,(err, tareaUpdated) => {
				if(err){
					 res.status(500).send({
						 message: 'Error al actualizar producto'
					 });
				}else{
					if(!tareaUpdated){
						res.status(404).send({message: 'No se ha podido actualizar el producto'});
					}else{
						res.status(200).send({tarea: tareaUpdated});
						
					}
				}
			});
				}
//modifica tarea en terminada
				function updateTareaTerminada(req, res){
					var tareaId = req.params.id;
				
					Tarea.findByIdAndUpdate(tareaId,{estatus :'Terminada'} ,(err, tareaUpdated) => {
						if(err){
							 res.status(500).send({
								 message: 'Error al actualizar producto'
							 });
						}else{
							if(!tareaUpdated){
								res.status(404).send({message: 'No se ha podido actualizar el producto'});
							}else{
								res.status(200).send({tarea: tareaUpdated});
							}
						}
					});
						}

						function EliminarTerminadas(res){
							
								Tarea.remove(  {estatus: 'Terminada'}(err, tareaRemoved) 
									
								);
						}
		


module.exports = {
  guardarTarea,
	getTareas,
	getTarea,
	deleteTarea,
	updateTarea,
	getTareasUser,
	updateTareaProceso,
	updateTareaTerminada,
	getTareasEstatus,
	EliminarTerminadas


};
