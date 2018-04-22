'use strict'
//libreria para cifrar contrseñas(modulos)
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');

//servicio jwt

var jwt = require('../services/jwt');

//acciones

function pruebas(req, res){
	res.status(200).send({
		message: 'probando el controlador de usuarios y la acción'
	});
}

function saveUser(req, res){
	//crear objeto del usuario
	var user = new User();

//recojer el body ,parametros de la peticion
var params = req.body;

if(params.password && params.nombre && params.apellido && params.email){

//asignar valores al objeto usuario

user.nombre = params.nombre;
user.apellido = params.apellido;
user.email = params.email;
user.rol = 'ROLE_USER';

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
						message: 'El usuario no a podido loguearse correctamente'
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
			res.status(200).send({
				message: 'Actualizar usuario'
			});

		}

	

module.exports = {
	pruebas,
	saveUser,
	login,
	updateUser
	
};

