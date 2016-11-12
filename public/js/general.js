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
	$("#alertMsj").empty();
	$("#alertMsj").append(htmlAlert);
	$("#alertBody").modal();

}

function agregarACarrito(el, id, idProducto, desProducto, precioUnitario, urlImagen){
	console.log("id: " + id + "-idProducto: " + idProducto + "-des: " + desProducto + "-coun: " + precioUnitario);
	var prodCar = {
		id: id,
		idProducto: idProducto,
		desProducto: desProducto,
		precioUnitario: precioUnitario,
		cantidad: 1,
		urlImagen: urlImagen,
		precioSubtotal: (precioUnitario*1)
	}
	if(localStorage.carTrikas){
		console.log("existe car");
		var carTrikas = JSON.parse(localStorage.carTrikas);
		var indProdCar = carTrikas.findIndex(function(el){
			console.log("--el.id: " + el.id + "--prodCar.id: " + prodCar.id);
			return (el.id==prodCar.id);
		});
		console.log("indProdCar: " + indProdCar);
		if(indProdCar>=0){
			carTrikas[indProdCar].cantidad += prodCar.cantidad;
			carTrikas[indProdCar].precioSubtotal = (carTrikas[indProdCar].cantidad * prodCar.precioUnitario);
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
	localStorage.removeItem("carTrikas");
}

function obtenerHostname(){
	var port= window.location.port;
	if(port!=""){
		port=":" + port;
	}
	var sHostname = window.location.protocol + "//" + window.location.hostname + port;
	console.log("sHostname: " + sHostname);
	return sHostname;
}