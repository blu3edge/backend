'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  image: String,
  role: String,
  cargo: String,
  telefono: Number,
  ultimaconexion : String
  });

module.exports = mongoose.model('User', UserSchema);
