'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentasSchema = Schema({
  fecha: String,
  cantidad: Number,
  total: Number


  });

module.exports = mongoose.model('Ventas', UserSchema);
