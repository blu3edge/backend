'use strict'

var express = require('express');
var TareaController = require('../controllers/tarea');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');




api.post('/guardar-tarea', TareaController.guardarTarea);
api.get('/tareas', TareaController.getTareas);
api.get('/tarea/:id', TareaController.getTarea);
api.get('/tareaAsignada', TareaController.getTareasEstatus);
api.delete('/eliminar-tarea/:id', TareaController.deleteTarea);
api.delete('/tareasEliminadas', TareaController.EliminarTerminadas);
api.put('/editartarea/:id', TareaController.updateTarea);
api.put('/editartareaProceso/:id', TareaController.updateTareaProceso);
api.put('/editartareaTerminada/:id', TareaController.updateTareaTerminada);
api.get('/tareauser/:id', TareaController.getTareasUser);



module.exports = api;
