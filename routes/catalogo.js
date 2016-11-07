var express = require('express');
var router = express.Router();
var daProducto = require('../datos/producto'), //mongo connection
	daCategoria = require('../datos/categoria'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

/* GET Catalogo Page */
router.get('/', function(req, res, next){
	daCategoria.getCategoriasCatalogo(function(err, categorias){
        if(err){
            res.render('catalogo/index', 
            { 
                title: 'Producto Trikas: Error al obtener las categorías.' , 
                "home": '', 
                "catalogo": '', 
                "carrito": '', 
                "login": '',
                "categorias": null,
                "productos": null
            });
        }else{
        	daProducto.getProductosCatalogo(function(err, productos){
        		if(err){
        			res.render('catalogo/index', 
		            { 
		                title: 'Producto Trikas: Error al obtener los productos.' , 
		                "home": '', 
		                "catalogo": '', 
		                "carrito": '', 
		                "login": '',
		                "categorias": null,
		                "productos": null
		            });
        		}else{
        			res.render('catalogo/index', 
		            { 
		                title: 'Producto Trikas' , 
		                "home": '', 
		                "catalogo": '', 
		                "carrito": '', 
		                "login": '',
		                "categorias": categorias,
		                "productos": productos
		            });
        		}
        	})

            
        }
        
    })
});

module.exports = router;