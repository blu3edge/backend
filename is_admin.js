'use strict'
//middleware impide que un usuarios distinto a admin tenga acceso a algun servicio.
exports.isAdmin = function(req, res, next){
if(req.user.role != 'ROLE_ADMIN'){
	return res.status(200).send({message: 'No tienes acceso a esta zona'});
}
	next();
};
