var express = require('express');
var router = express.Router();
var daUsuario = require('../datos/usuario'), //mongo connection
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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('usuario/index', 
		{ 
			title: 'Usuarios Trikas' , 
			"home": '', 
			"catalogo": '', 
			"carrito": '', 
			"login": '',
			"usuarios": daUsuario.getUsuarios()
		});
});

//POST a new User
router.post('/', function(req, res, next) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oUsuario = {};
        oUsuario.correo = req.body.correo;
        oUsuario.contrasenha = req.body.contrasenha;
        oUsuario.nick = "";
        oUsuario.token = "";
        oUsuario.nombre = "";
        oUsuario.dni = "";
        oUsuario.fecNacimiento = Date.now();
        oUsuario.fecCreacion = Date.now();
        oUsuario.fecModificacion = Date.now();
        oUsuario.rol = "";
    
    //call the create function for our database
    console.log('POST creating new USUARIO: ' + oUsuario);
    daUsuario.addUsuario(oUsuario, function(rptaBD){
    	res.json(rptaBD);
    });
});

//POST a validacion de cuenta
router.post('/autenticacion', function(req, res, next) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oUsuario = {};
        oUsuario.correo = req.body.correo;
        oUsuario.contrasenha = req.body.contrasenha;
        oUsuario.token = req.body.token;
    
    //call the create function for our database
    console.log('POST creating new USUARIO: ' + oUsuario);
    daUsuario.addUsuario(oUsuario, function(rptaBD){
    	res.json(rptaBD);
    });
});

module.exports = router;
