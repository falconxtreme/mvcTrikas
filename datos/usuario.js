var usuarioModel = require('../model/usuario'); //modelo mongoose de usuario
var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daUsuario que permitirá interactuar con la bd Mongoose
var daUsuario = {};

daUsuario.getUsuarios = function (){
	usuarioModel.find({}, function (err, usuarios) {
		if (err) {
			return console.error(err);
		} else {
			return usuarios;
		}
	});
}

daUsuario.addUsuario = function(usuarioIn, fnIn){
	usuarioModel.find({
		correo: usuarioIn.correo
	}, function (err, usuarios) {
		if (err) {
			console.error(err);
			fnIn(err);
		} else {
			if(usuarios && usuarios.length>0){
				fnIn("Ya existe una cuenta creada con el mismo correo.")
			} else{
				usuarioModel.create({
				    correo : usuarioIn.correo,
				    contrasenha : usuarioIn.contrasenha,
				    nick : usuarioIn.nick,
				    token : usuarioIn.token,
				    nombre : usuarioIn.nombre,
				    dni: usuarioIn.dni,
				    fecNacimiento: usuarioIn.fecNacimiento,
				    fecCreacion: usuarioIn.fecCreacion,
				    fecModificacion: usuarioIn.fecModificacion,
				    rol: usuarioIn.rol
			    }, function (err, usuario) {
					if (err) {
					  fnIn("Hubo un problema agregando la información a la base de datos.");
					} else {
					  //Categoria has been created
					  if(usuario){
					  	usuario._id="";
					  	usuario.contrasenha="";
					  	usuario.token="";
					  	usuario.rol="";
					  }
					  fnIn(usuario);
					}
			    });
			}
		}
	});
}

daUsuario.autenticarCorreo = function(usuarioIn, fnIn){
	usuarioModel.find({
		correo: usuarioIn.correo,
		contrasenha : usuarioIn.contrasenha
	}, function (err, usuarios) {
		if (err) {
			console.error(err);
			fnIn(err);
		} else {
			if(usuarios){
				if (usuarios.length==1){
				  	usuarios[0]._id="";
				  	usuarios[0].contrasenha="";
				  	usuarios[0].token="";
				  	usuarios[0].rol="";
					fnIn(usuarios[0]);
				} else if(usuarios.length>0){
					fnIn("Existe más de una coincidencia con la información ingresada.")
				}else{
					fnIn("Datos Incorrectos, por favor vuelva a intentarlo.")
				}
			} else{
				fnIn("Datos Incorrectos, por favor vuelva a intentarlo.")
			}
		}
	});
}

module.exports = daUsuario;