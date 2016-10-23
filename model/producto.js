var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Categoria = mongoose.model('Categoria');

var productoSchema = new mongoose.Schema({
	idProducto: String,
	desProducto: String,
	costoUnitario: Number,
	stock: Number,
	precioUnitario: Number,
	urlImagen: String,
	fecCreacion: { type: Date, default: Date.now },
	fecModificacion: { type: Date, default: Date.now },
	categoria: {type: Schema.ObjectId, ref: "Categoria"}
	usuario: {type: Schema.ObjectId, ref: "Usuario"}
	usuarioMod: {type: Schema.ObjectId, ref: "Usuario"}
	esActivo: Boolean
});

module.exports = mongoose.model('Producto', productoSchema);

