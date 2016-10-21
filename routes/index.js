var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  		{ 
  			title: 'Trikas' , 
  			"home": 'active', 
  			"catalogo": '', 
  			"carrito": '', 
  			"login": ''
  		});
});

module.exports = router;
