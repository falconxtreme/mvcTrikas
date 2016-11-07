$(document).ready(function(){
	function crearFilaNoProduct(){
		var html=	'<div clas="row producto-carrito">' +
						'<div class="alert alert-danger" role="alert">' +
							'<strong>Lo sentimos!</strong> Debe agregar productos para realizar su compra' +
						'</div>' +
					'</div>';
		return html;
	}

	function crearFilaProduct(oProd){
		var html =	'<div class="row producto-carrito">' +
						'<div class="col-xs-12 col-md-5">' +
							'<label>' + oProd.idProducto + '</label>' +
						'</div>' +
						'<div class="col-xs-12 col-md-2">' +
							'<label> S/. ' + oProd.costoUnitario + '</label>' +
						'</div>' +
						'<div class="col-xs-12 col-md-2">' +
							'<label>' + oProd.cantidad + '</label>' +
						'</div>' +
						'<div class="col-xs-12 col-md-2">' +
							'<label> S/. ' + oProd.precioSubtotal + '</label>' +
						'</div>' +
					'</div>';
		return html;
	}

	function crearFilaLimpiar(){
		var html = '<div class="row producto-carrito">' +
						'<div class="col-xs-12">' +
							'<button type="button" class="btn btn-danger" onclick="vaciarCarrito()">Limpiar Carrito</button>' +
						'</div>' +
					'</div>';
		return html;
	}

	function cargarProductos(){
		var $carritoProds = $("#carritoProds");
		$carritoProds.empty();
		if(localStorage.carTrikas){
			$("#divTotalAPagar").removeClass("noDisplay");
			var carTrikas = JSON.parse(localStorage.carTrikas);
			var $hTotalPagar = $("#hTotalPagar");
			var totalAPagar = 0;
			for(var i=0; i<carTrikas.length; i++){
				totalAPagar+=carTrikas[i].precioSubtotal;
				$carritoProds.append(crearFilaProduct(carTrikas[i]));
			}
			$hTotalPagar.empty();
			$hTotalPagar.append("S/. " + totalAPagar);
			$carritoProds.append(crearFilaLimpiar());
		}else{
			mostrarNoProductos();
		}
	}

	cargarProductos();

	$("#aPedir").click(function(ev){
		alert("Se pidió correctamente!");
	})
})

function mostrarNoProductos(){
	var $divTotalAPagar = $("#divTotalAPagar");
	if(!$divTotalAPagar.hasClass("noDisplay")){
		$divTotalAPagar.addClass("noDisplay");	
	}
	$carritoProds.append(crearFilaNoProduct());
}

function vaciarCarrito(){
	limpiarCarrito();
	$("#carritoProds").empty();
	$("#hTotalPagar").empty();
	mostrarNoProductos();
}
