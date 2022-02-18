'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
  rut: String,
  razonSocial: String,
  rubro: String,
  nombre: String,
  direccion: String,
  contacto: String,
  correo: String,
  telefono: Number,
  fax: Number
  });

module.exports = mongoose.model('Cliente', ClienteSchema);
