var mongoose = require('mongoose');
var productoSchema = new mongoose.Schema({
	idProducto: Number,
	desProducto: String,
	idCategoria: Number,
	desCategoria: String,
	costoUnitario: Number,
	stock: Number,
	precioUnitario: Number,
	fecCreacion: { type: Date, default: Date.now },
	idUsuario: String,
	fecModificacion: { type: Date, default: Date.now },
	idUsuModificacion: String,
	esActivo: Boolean
});
mongoose.model('Producto', productoSchema);

