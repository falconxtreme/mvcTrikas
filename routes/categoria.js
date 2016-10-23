var express = require('express');
var router = express.Router();
var daCategoria = require('../datos/categoria'), //mongo connection
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
}));

/* GET Categoria Page */
router.get('/', function(req, res, next){
	res.render('categoria/index', 
		{ 
			title: 'Categoría Trikas' , 
			"home": '', 
			"catalogo": 'active', 
			"carrito": '', 
			"login": '',
			"categorias": daCategoria.getCategorias()
		});
});

/* GET Nuevo Categoria page. */
router.get('/nuevo', function(req, res) {
    res.render('categoria/nuevo', { title: 'Nueva Categoria' });
});

module.exports = router;