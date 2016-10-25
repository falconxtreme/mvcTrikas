var rolModel = require('../model/rol'); //modelo mongoose de categoria

var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daRol = {};

daRol.getRoles = function (){
	rolModel.find({}, function (err, roles) {
		if (err) {
			return console.error(err);
		} else {
			return roles;
		}
	});
}

daRol.addRol = function(rolIn, fnIn){
	rolModel.create({
	    idRol : rolIn.idRol,
	    desRol : rolIn.desRol,
	    fecCreacion : rolIn.fecCreacion,
	    fecModificacion : rolIn.fecModificacion,
	    esActivo: rolIn.esActivo
    }, function (err, rol) {
		if (err) {
		  fnIn("Hubo un problema agregando la información a la base de datos.");
		} else {
		  //Categoria has been created
		  fnIn("El rol ha sido creado correctamente.");
		}
    })
}

module.exports = daRol;