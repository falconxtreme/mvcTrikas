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
							'<label> S/. ' + oProd.precioUnitario + '</label>' +
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
			localStorage.totalAPagarTrikas = totalAPagar;
		}else{
			mostrarNoProductos();
		}
	}

	cargarProductos();

	$("#aPedir").click(function(ev){
		alert("Se pidió correctamente!");
		var productos = JSON.parse(localStorage.carTrikas);
		var totalAPagar = JSON.parse(localStorage.totalAPagarTrikas);

		var dataIn = {
			productos: productos,
			totalAPagar: totalAPagar,
			cantProd: productos.length,
			correo: localStorage.usuarioTrikas
		};

		$.ajax({
			type: 'POST',
			url: obtenerHostname() + '/carrito',
			data: dataIn,
			async: false,
			beforeSend: function(xhr){
				if(xhr && xhr.overrideMimeType){
					xhr.overrideMimeType('application/json;charset=utf-8');
				}
			},
			dataType: 'json',
			success: function(data){
				if(data){
					if(typeof (data) == 'string'){
						//alert("Registro inválido! " + data);
						agregarMsj("msjValidacion", data, false);
					}else{
						//alert("Registro válido!");
						console.log("**objeto guardado******");
						console.log(data);
						alertExito("Se ha registrado correctamente el Pedido.", true);
					}
				}else{
					alertExito("Ocurrió un error al momento de guardar el Pedido.", false);
				}
			}
		});
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
