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

function agregarACarrito(el, id, idProducto, desProducto, costoUnitario){
	var prodCar = {
		id: id,
		idProducto: idProducto,
		desProducto: desProducto,
		costoUnitario: costoUnitario,
		cantidad: 1,
		precioSubtotal: (costoUnitario*1)
	}
	if(localStorage.carTrikas){
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
		var carTrikas=[];
		carTrikas.push(prodCar);
	}
	alert("Se agregó correctamente!");
}

function limpiarCarrito(){

}