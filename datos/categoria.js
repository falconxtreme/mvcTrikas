var categoriaModel = require('../model/categoria'); //modelo mongoose de categoria

var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daCategoria = {};

daCategoria.getCategorias = function (){
	categoriaModel.find({}, function (err, categorias) {
		if (err) {
			return console.error(err);
		} else {
			return categorias;
		}
	});
}

daCategoria.addCategoria = function(categoriaIn, fnIn){
	categoriaModel.create({
	    idCategoria : categoriaIn.idCategoria,
	    desCategoria : categoriaIn.desCategoria,
	    fecCreacion : categoriaIn.fecCreacion,
	    fecModificacion : categoriaIn.fecModificacion,
	    usuario: categoriaIn.idUsuario,
	    esActivo: categoriaIn.esActivo
    }, function (err, categoria) {
		if (err) {
		  fnIn("Hubo un problema agregando la información a la base de datos.");
		} else {
		  //Categoria has been created
		  fnIn("La categoría ha sido creada correctamente.");
		}
    })
}

module.exports = daCategoria;