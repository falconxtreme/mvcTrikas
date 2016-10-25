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
  res.send('respond with a resource');
});

//POST a new Categoria
router.post(function(req, res) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oCategoria = {};
        oCategoria.idCategoria = req.body.idCategoria;
        oCategoria.desCategoria = req.body.desCategoria;
        oCategoria.fecCreacion = Date.now;
        oCategoria.fecModificacion = Date.now;
        oCategoria.esActivo = req.body.esActivo;
    var name = req.body.name;
    var badge = req.body.badge;
    var dob = req.body.dob;
    var company = req.body.company;
    var isloved = req.body.isloved;
    //call the create function for our database
    mongoose.model('Blob').create({
        name : name,
        badge : badge,
        dob : dob,
        isloved : isloved
    }, function (err, blob) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          } else {
              //Blob has been created
              console.log('POST creating new blob: ' + blob);
              res.format({
                  //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                html: function(){
                    // If it worked, set the header so the address bar doesn't still say /adduser
                    res.location("blobs");
                    // And forward to success page
                    res.redirect("/blobs");
                },
                //JSON response will show the newly created blob
                json: function(){
                    res.json(blob);
                }
            });
          }
    })
});

module.exports = router;
