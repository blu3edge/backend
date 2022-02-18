'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotaDeVentaSchema = Schema({
  numero: { type: Number, default: 0},
  fechaEmision: { type : Date, default: Date.now },
  fechaEstimadaEntrega: String,
  cliente: {type: Schema.ObjectId, ref: 'Cliente'},
  ordenDeCompra: String,
  producto: {type: Schema.ObjectId, ref: 'Producto'},
  cantidad: Number,
  valorNeto: Number,
  iva: Number,
  valorBruto: Number,
  direccionDespacho: String,
  observacionesDespacho: String,
  contacto: String
});

module.exports = mongoose.model('Notadeventa', NotaDeVentaSchema);
