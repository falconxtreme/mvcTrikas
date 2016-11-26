var nodemailer = require('nodemailer');
 
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'trikas.restaurante.bar@gmail.com',
		pass: 'restaurantetrikas'
	}
});

var daCorreo = {};

function crearMensajeDeActivacion(codCuenta, correoAActivar, pass){
	var msj = '<b>Hello world ✔</b>' + 'Para activar la cuenta ' + 
		codCuenta + ' ingrese al siguiente link <b>Click aquí</b>';
		'Estimado usuario(a) para poder activar tu cuenta favor de copiar el siguiente link ' + 
		'.$url_activacion.?activar=true&id=' + 
		' y pegarlo en la barra de direcciones de tu navegador.<br /><br />' ;
	return msj;
}

daCorreo.enviarEmailActivacionCuenta = function(correoAActivar, codCuenta, fnIn){
	var mailOptions = {
	    from: 'trikas.restaurante.bar@gmail.com', // sender address
	    to: correoAActivar, // list of receivers
	    subject: 'Activación de cuenta', // Subject line
	    //text: 'Para activar la cuenta ' + codCuenta + ' ingrese al siguiente link https://google.com.pe' //, // plaintext body
	    html: crearMensajeDeActivacion(codCuenta,correoAActivar,"")// You can choose to send an HTML body instead
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	    	console.log(error);
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


/*
'<table width="629" border="0" cellspacing="1" cellpadding="2"> 
  <tr> 
    <td width="623" align="left"></td> 
  </tr> 
  <tr> 
    <td bgcolor="#2EA354"><div style="color:#FFFFFF; font-size:14; font-family: Arial, Helvetica, sans-serif; text-transform: capitalize; font-weight: bold;"><strong>     Estos son sus datos de registro, '.$row['usuario'].'</strong></div></td> 
  </tr> 
  <tr> 
    <td height="95" align="left" valign="top"><div style=" color:#000000; font-family:Arial, Helvetica, sans-serif; font-size:12px; margin-bottom:3px;"> USUARIO: '.$row['usuario'].'</strong><br><br><br> 
          <strong>SU CLAVE : </strong>'.$row['password'].'</strong><br><br><br> 
          <strong>SU EMAIL : </strong>'.$row['email'].'</strong><br><br><br> 
          <strong>SU LINK DE ACTIVACION:<br><a href="'.$activateLink.'">'.$activateLink.' </strong></a><br><br><br> 
          <strong>POR FAVOR HAGA CLICK EN LINK DE ARRIBA PARA ACTIVAR SU CUENRA Y ACCEDER A LA PAGINA SIN RESTRICCIONES</strong><br><br><br> 
          <strong>SI EL LINK NO FUNCIONA ALA PRIMERA INTENTELO UNA SEGUNDA, EL SERVIDOR A VECES TARDA EN PROCESAR LA PRIMERA ORDEN</strong><br><br><br> 
           
          <strong>GRACIAS POR REGISTRARSE EN CEVIT.</strong><br><br><br> 
    </div> 
    </td> 
  </tr> 
</table>'
*/