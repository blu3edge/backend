'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port =  process.env.PORT || 3790;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/inventory')
	.then(() => {
		console.log('La conexión a la base de datos inventory se ha realizado correctamente...');
		
		app.listen(port, () => {
			console.log("Servidor local corriendo correctamente");
		});
	})
	.catch(err => console.log(err));

