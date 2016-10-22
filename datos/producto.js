var productoModel = require('../model/producto'); //modelo mongoose de producto
var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daProducto = {};

daProducto.getProductos = function (){
	mongoose.model('Producto').find({}, function (err, productos) {
		if (err) {
			return console.error(err);
		} else {
			return productos;
		}     
	});
}

module.exports = daProducto;