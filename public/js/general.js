function agregarMsj(idMsjValidacion, msjValidacion, esExito){
	var $msjValidacion = $("#"+idMsjValidacion);
	var html =  '<div class="alert alert-success" role="alert">' +
						'<strong>Éxito!</strong> ' + msjValidacion +
				'</div>';
	if(!esExito){
		html =  '<div class="alert alert-danger" role="alert">' +
						'<strong>Lo sentimos!</strong> ' + msjValidacion +
				'</div>';
	}
	$msjValidacion.html(html);
}

function alertExito(msj, esExito){
	var htmlAlert = '<strong>Bien hecho!</strong> ' + msj ;
	if (!esExito){
		htmlAlert = '<strong>Lo sentimos!</strong> ' + msj ;
	}
	 /*
	htmlAlert=	'<div id="alertBody" class="modal fade">' +
				  '<div class="modal-dialog" role="document">' +
				    '<div class="modal-content">' +
				      '<div class="modal-header mod-hd-trikas">' +
				        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
				          '<span aria-hidden="true">&times;</span>' +
				        '</button>' +
				        '<div class="alert alert-success alert-trikas" role="alert">' +
	  						'<strong>Bien hecho!</strong> ' + msj +
						'</div>' +
				      '</div>' +
				    '</div>' +
				  '</div>' +
				'</div><';
	*/
	console.log($("body"));
	$("#alertMsj").empty();
	$("#alertMsj").append(htmlAlert);
	$("#alertBody").modal();

}

function agregarACarrito(el, id, idProducto, desProducto, costoUnitario, urlImagen){
	console.log("id: " + id + "-idProducto: " + idProducto + "-des: " + desProducto + "-coun: " + costoUnitario);
	var prodCar = {
		id: id,
		idProducto: idProducto,
		desProducto: desProducto,
		costoUnitario: costoUnitario,
		cantidad: 1,
		urlImagen: urlImagen,
		precioSubtotal: (costoUnitario*1)
	}
	if(localStorage.carTrikas){
		console.log("existe car");
		var carTrikas = JSON.parse(localStorage.carTrikas);
		var indProdCar = carTrikas.findIndex(function(el){
			return (el.id==prodCar.id);
		});
		if(indProdCar>=0){
			carTrikas[indProdCar].cantidad = prodCar.cantidad;
			carTrikas[indProdCar].precioSubtotal = carTrikas[indProdCar].cantidad * prodCar.costoUnitario;
		}else{
			carTrikas.push(prodCar);
		}
		localStorage.carTrikas = JSON.stringify(carTrikas);
	}else{
		console.log("no existe car");
		var carTrikas=[];
		carTrikas.push(prodCar);
		localStorage.carTrikas = JSON.stringify(carTrikas);
	}
	alertExito("Se agregó correctamente el producto.", true);
	//alert("Se agregó correctamente!");
}

function limpiarCarrito(){

}