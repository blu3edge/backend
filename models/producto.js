'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
  codigo: String,
  nombre: String,
  image: String,
  fechaingreso: String,
  numGuia: Number,
  origenenvio: String,
  descripcion: String,
  marca: String,
  modelo: String,
  tipo: String,
  fechaAdquisicion: String,
  cantidad: Number,
  valor: Number,
  total: Number,
  proveedor: { type: Schema.ObjectId, ref: 'Proveedor'}
});

module.exports = mongoose.model('Producto', ProductoSchema);
