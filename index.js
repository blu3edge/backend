'use strict'

var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var app = require('./app');
var port =  process.env.PORT || 3790;
//
//var stream = fs.createReadStream(csvfile);

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/inventory')
mongoose.connect('mongodb://nsaa:QWEqwe123@inventory-shard-00-00-1wdlm.mongodb.net:27017,inventory-shard-00-01-1wdlm.mongodb.net:27017,inventory-shard-00-02-1wdlm.mongodb.net:27017/test?ssl=true&replicaSet=Inventory-shard-0&authSource=admin&retryWrites=true')
	.then(() => {
		console.log('La conexión a la base de datos inventory se ha realizado correctamente...');

		app.listen(port, () => {
			console.log("Servidor local corriendo correctamente");
		});
	})
	.catch(err => console.log(err));
