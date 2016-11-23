var nodemailer = require('nodemailer');
 
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'trikas.restaurante.bar@gmail.com',
		pass: 'restaurantetrikas'
	}
});

var daCorreo = {};

daCorreo.enviarEmailActivacionCuenta = function(correoAActivar, codCuenta, fnIn){
	var mailOptions = {
	    from: 'trikas.restaurante.bar@gmail.com', // sender address
	    to: correoAActivar, // list of receivers
	    subject: 'Activación de cuenta', // Subject line
	    text: 'Para activar la cuenta ' + codCuenta + ' ingrese al siguiente link https://google.com.pe' //, // plaintext body
	    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        fnIn(error,null);
	        //res.json({yo: 'error'});
	    }else{
	    	console.log('=============Message sent: ' + info.response);
	        fnIn(null, '=============Mensaje enviado: ' + info.response);
	        //res.json({yo: info.response});
	    };
	});
}

module.exports = daCorreo;