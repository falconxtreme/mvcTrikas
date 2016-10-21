var express = require('express');
var router = express.Router();

/*Get Car Page*/
router.get('/', function(req, res, next){
	res.render('carrito/index', 
		{ 
			title: 'Carrito Trikas' , 
			"home": '', 
			"catalogo": '', 
			"carrito": 'active', 
			"login": ''
		});
});

module.exports = router;