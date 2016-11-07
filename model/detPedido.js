var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Producto = mongoose.model('Producto');
var Pedido = mongoose.model('Pedido');

var productoSchema = new mongoose.Schema({
	pedido: {type: mongoose.Schema.ObjectId, ref: "Pedido"},
	idProducto: String,
	desProducto: String,
	precioUnitario: Number,
	cantidad: Number,
	precioSubtotal: Number,
	estado: String,
	fecCreacion: { type: Date, default: Date.now },
	fecModificacion: { type: Date, default: Date.now },
	usuario: {type: mongoose.Schema.ObjectId, ref: "Usuario"},
	usuarioMod: {type: mongoose.Schema.ObjectId, ref: "Usuario"},
	producto: {type: mongoose.Schema.ObjectId, ref: "Producto"}
});

module.exports = mongoose.model('Producto', productoSchema);