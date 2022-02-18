'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TareaSchema = Schema({
  user: { type: Schema.ObjectId, ref: 'User'},
  titulo: String,
  descripcion: String,
  fechadecreacion: String,
  fechadeentrega: String,
  horadeentrega: String,
  estatus: String
    });

module.exports = mongoose.model('Tarea', TareaSchema);
