var productoModel = require('../model/producto'); //modelo mongoose de producto
var categoriaModel = require('../model/categoria'); //modelo mongoose de categoria
//var usuarioModel = require('../model/usuario'); //modelo mongoose de usuario

var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daProducto = {};

daProducto.getProductos = function (fnIn){
	productoModel.find({}, function (err, productos) {
		if(err){
			console.error(err);
			fnIn(err, null);
		}else{
			if(productos){
				categoriaModel.populate(productos,{path: "categoria"}, function (err, productos) {
					if (err) {
						console.error(err);
						fnIn(err, null);
					} else {
						fnIn(null, productos);
					}	
				});
			}else{
				fnIn("No existen productos", null);
			}
		}
		
	});
}

daProducto.addProducto = function(productoIn, fnIn){
	productoModel.create({
	    idProducto : productoIn.idProducto,
	    desProducto : productoIn.desProducto,
	    costoUnitario : productoIn.costoUnitario,
	    stock : productoIn.stock,
	    precioUnitario : productoIn.precioUnitario,
	    urlImagen : productoIn.urlImagen,
	    desProducto : productoIn.desProducto,
	    fecCreacion : productoIn.fecCreacion,
	    fecModificacion : productoIn.fecModificacion,
	    categoria: productoIn.categoria,
	    usuario: productoIn.usuario,
	    usuarioMod: productoIn.usuarioMod,
	    esActivo: productoIn.esActivo
    }, function (err, producto) {
		if (err) {
		  fnIn("Hubo un problema agregando la información a la base de datos. " + err);
		} else {
		  //Categoria has been created
		  fnIn(producto);
		}
    })
}

daProducto.updProducto = function(productoIn, fnIn){
	productoModel.findById(productoIn._id, function (err, producto) {
        //update it
        producto.update({
            idProducto : productoIn.idProducto,
		    desProducto : productoIn.desProducto,
		    costoUnitario : productoIn.costoUnitario,
		    stock : productoIn.stock,
		    precioUnitario : productoIn.precioUnitario,
		    urlImagen : productoIn.urlImagen,
		    desProducto : productoIn.desProducto,
		    fecModificacion : productoIn.fecModificacion,
		    categoria: productoIn.categoria,
		    usuarioMod: productoIn.usuarioMod,
		    esActivo: productoIn.esActivo
        }, function (err, producto) {
			if (err) {
		  		fnIn("Hubo un problema actualizando la información de la base de datos. " + err);
			} 
			else {
				fnIn(producto);
			}
        })
    });
}

daProducto.delProducto = function(id, fnIn){
	productoModel.findById(id, function (err, producto) {
        if (err) {
            return console.error(err);
        } else {
        	if(producto){
        		//remove it from Mongo
	            producto.remove(function (err, producto) {
	                if (err) {
	                    console.error(err);
	                    fnIn("Hubo un problema eliminando la información de la base de datos.");
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + producto._id);
	                    fnIn(producto);
	                }
	            });
        	}else{
        		fnIn("No se encontró el producto en la base de Datos.");
        	}
        }
    });
}

module.exports = daProducto;