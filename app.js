'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./rutes/user');
var producto_routes = require('./rutes/producto');
var proveedor_routes = require('./rutes/proveedor');
var movimiento_routes = require('./rutes/movimientos');
var nota_routes = require('./rutes/notadeventa');
var cliente_routes = require('./rutes/cliente');
var Tarea_routes = require('./rutes/tarea');


//middlerares de body-parser(funcion que se ejecuta lo primero de al hacer peticion http )
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin' , '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow' , 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//rutas base
app.use('/api', user_routes);
app.use('/api', producto_routes);
app.use('/api', proveedor_routes);
app.use('/api', movimiento_routes);
app.use('/api', nota_routes);
app.use('/api', cliente_routes);
app.use('/api', Tarea_routes);
//rutas body-parser



module.exports = app;
