var express = require('express');
var router = express.Router();

/* GET Catalogo Page */
router.get('/', function(req, res, next){
	res.render('catalogo/index', { title: 'Express' , "home": '', "catalogo": 'active'});
});

module.exports = router;