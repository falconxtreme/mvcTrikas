/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trikasbd');*/

if (!global.hasOwnProperty('db')) {

  var mongoose = require('mongoose');
  var dbName = 'trikasbd'

  // the application is executed on the local machine ...
  mongoose.connect('mongodb://localhost/' + dbName);


  global.db = {

    mongoose: mongoose,

    //models
    Rol:           require('./rol')(mongoose),
    Usuario:       require('./usuario')(mongoose),
    Categoria:     require('./categoria')(mongoose),
    Producto:      require('./producto')(mongoose)
    
  };

}

module.exports = global.db;