var express = require('express');
var router = express.Router();

/*Get Login Page*/
router.get('/', function(req, res, next){
	res.render('login/index',
		{
			title:'Login Trikas',
			"home": '',
			"catalogo": '',
			"carrito":'',
			"login":'active'
		})
});