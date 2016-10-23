var productoModel = require('../model/producto'); //modelo mongoose de producto
var categoriaModel = require('../model/categoria'); //modelo mongoose de categoria
//var usuarioModel = require('../model/usuario'); //modelo mongoose de usuario

var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daProducto = {};

daProducto.getProductos = function (){
	productoModel.find({}, function (err, productos) {
		categoriaModel.populate(productos,{path: "categoria"}, function (err, productos) {
			if (err) {
				return console.error(err);
			} else {
				return productos;
			}	
		});
	});
}

/*
mongoose.model('Producto').find({}, function (err, productos) {
		if (err) {
			return console.error(err);
		} else {
			return productos;
		}     
	});
*/
module.exports = daProducto;