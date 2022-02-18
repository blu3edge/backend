	'use strict'
//libreria para cifrar contrseñas(modulos)
var bcrypt = require('bcrypt-nodejs');

//file sistem, libreria para poder trabajar con sistema de ficheros
var fs = require('fs');
//accerder a rutas de nuestro sistema de archivos
var path = require('path');
//modelos
var User = require('../models/user');
var moment = require('moment');

//servicio jwt

var jwt = require('../services/jwt');

//acciones

function pruebas(req, res){
	res.status(200).send({
		message: 'probando el controlador de usuarios y la acción',
		user: req.user
	});
}

function saveUser(req, res){
	//crear objeto del usuario
	var user = new User();

//recojer el body ,parametros de la peticion
var params = req.body;

if(params.password && params.nombre && params.apellido && params.email && params.cargo && params.telefono){

//asignar valores al objeto usuario

user.nombre = params.nombre;
user.apellido = params.apellido;
user.email = params.email;
user.role = 'ROLE_USER';
user.image = null;
user.cargo = params.cargo;
user.telefono = params.telefono;
user.ultimaconexion = null;

User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
	if(err){
		res.status(500).send({message: 'Error al comprobar usuario'});
	}
	else{
		if(!issetUser){
			//Cifrar contraseña
			bcrypt.hash(params.password, null, null, function(err, hash){
			user.password = hash;

//guarda usuario en bd
	user.save((err, userStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar usuario'});
		}else{
			if(!userStored){
				res.status(404).send({message: 'No se ha registrado el usuario'});
			}else{
				res.status(200).send({user: userStored});
			}
		}

});
});

		}else{
			res.status(200).send({
		message: 'El usuario no puede registrarse por que ya existe'
	});
		}
	}
});

}else{
	res.status(200).send({
		message: 'Introduce los datos correctamente para poder registrar el usuario'
	});
 }
}

	function login(req, res){
		var params = req.body;

		var email = params.email;
		var password = params.password;


		User.findOne({email: email.toLowerCase()}, (err, user) => {
	if(err){
		res.status(500).send({message: 'Error al comprobar usuario'});
	}
	else{
		if(user){
			bcrypt.compare(password, user.password, (err, check) => {
				if(check){
					//comprobar token y generar
					if(params.gettoken){
						//devolver token jwt
						res.status(200).send({
							token: jwt.createToken(user)
						
						});

					}else{
						res.status(200).send({user});
							}

				}else{
					res.status(404).send({
						message: 'El usuario no a podido autenticarse correctamente'
					});
				}
			});

			}else{
			res.status(404).send({
			message: 'El usuario no existe'
		});

		}
	}
});
}
		//actualizar usuarios registrados

		function updateUser(req, res){
			var userId = req.params.id;
			var update = req.body;
			delete update.password;

			
			User.findByIdAndUpdate(userId, update, {new:true} ,(err, userUpdated) => {
				if(err){
					 res.status(500).send({
						 message: 'Error al actualizar usuario'
					 });
				}else{
					if(!userUpdated){
						res.status(404).send({message: 'No se ha podido actualizar el usuario'});
					}else{
						res.status(200).send({user: userUpdated});
					}
				}
			});
				}
//metodo para subir imagen de usuario
function uploadImage(req, res){
	var userId = req.params.id;
	var file_name = 'no subido..';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

var ext_split = file_name.split('\.');
var file_ext = ext_split[1];
if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
	if(userId != req.user.sub){
		return res.status(500).send({message: 'No tienes permiso para actualizar el usuario'});
	}
	User.findByIdAndUpdate(userId, {image: file_name}, {new:true}, (err, userUpdated) => {
		if(err){
			 res.status(500).send({
				 message: 'Error al actualizar usuario'
			 });
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({user: userUpdated, image: file_name});
			}
		}
	});

			}else{
				//borrar archivo subido de formato no permitido
				fs.unlink(file_path, (err) => {
					if(err){
							res.status(200).send({message: 'Formato de no permitido y no se borro archivo'});
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
	var path_file = './uploads/users/'+imageFile;

fs.exists(path_file, function(exists){
	if(exists){
		res.sendFile(path.resolve(path_file));
	}else{
		res.status(404).send({message: 'no existe imagen'});
	}

});
}
//listar usuarios con rol usuario
function getUsuarios(req, res){
	User.find({role:'ROLE_USER'}).exec((err, users) => {
		if(err){
			res.status(500).send({message: 'error en la petición'});
		}else{
			if(!users){
				res.status(404).send({message: 'No hay Usuarios'});
			}else{
				res.status(200).send({users});
			}
		}
	});
}

//borrar usuarios
function deleteUser(req, res){
	var userId = req.params.id;
		User.findByIdAndRemove(userId, (err, userRemoved) => {
			if(err){
				res.status(500).send({message: 'error en la petición'});
			}else{
				if(!userRemoved){
					res.status(404).send({message: 'No se a podido borrar usuario'});
				}else{
					res.status(200).send({user: userRemoved});
				}
			}
		});
}
//Buscar usuario por id
function getUser(req, res){
	var userId = req.params.id;
	User.findById(userId, (err, user) => {
		if(err){
			res.status(500).send({message: 'error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'No se a podido encontrar usuario'});
			}else{
		res.status(200).send({user});
	}
}
	});
}


//function getUser(req, res){
	//var userId = req.params.id;
//	User.findById(userId, function(err, userFind) => {
	//	if(err){
//res.status(500).send({message: 'Error en la petición'});
//}else{
	//			res.status(404).send({message: 'No existe Usuario'});
//}else{
//res.status(200).send({user});
//}
//}
//});

//}

module.exports = {
	pruebas,
	saveUser,
	login,
	updateUser,
	uploadImage,
	getImageFile,
	getUsuarios,
	deleteUser,
 getUser
};
