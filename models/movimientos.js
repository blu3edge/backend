'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MovimientosSchema = Schema({
fecha : { type : Date, default: Date.now },
usuario: { type: Schema.ObjectId, ref: 'User'},
tipo: String,
subtipo: String,
producto: { type: Schema.ObjectId, ref: 'Producto'},
cantidad: Number
    });

    module.exports = mongoose.model('Movimientos', MovimientosSchema);
