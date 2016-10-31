$(document).ready(function(){
	$("#frmAddCategory").submit(function(ev){
		ev.preventDefault();
		guardarCategoria();
	});

	function agregarCategoria(oCat){
		var $detCategorias = $("#detCategorias");
		var html = '<div class="row">'
	}

	function guardarCategoria(){
		var idCategoria = $("#txtIdCategoria").val().trim();
		var desCategoria = $("#txtDesCategoria").val().trim();
		var esActivo = $("#chkActivo").is(":checked");

		var dataIn = {
			idCategoria: idCategoria,
			desCategoria: desCategoria,
			esActivo: esActivo,
			correo: localStorage.usuarioTrikas
		};

		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/categoria',
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
						agregarMsj("msjValidacion", "Se ha registrado correctamente la Categoría.", true);
					}
				}else{
					agregarMsj("msjValidacion", "Ocurrió un error al momento de guardar la Categoría.", false);
				}
			}
		});
	};
	
});

function editarCategoria(id, idCategoria, desCategoria, esActivo){
	$("#txtId").val(id);
	$("#txtIdCategoria").val(idCategoria);
	$("#txtDesCategoria").val(desCategoria);
	$("#chkActivo").attr(esActivo);

	var $btnGuardarCategoria = $("#btnGuardarCategoria");
	var $btnActualizarCategoria = $("#btnActualizarCategoria");
	$btnGuardarCategoria.addClass("noDisplay");
	$btnActualizarCategoria.removeClass("noDisplay");
}

function actualizarCategoria(){
	var id = $("#txtId").val().trim();
	var idCategoria = $("#txtIdCategoria").val().trim();
	var desCategoria = $("#txtDesCategoria").val().trim();
	var esActivo = $("#chkActivo").is(":checked");

	console.log("id: " + id);
	console.log("idCategoria: " + idCategoria);
	console.log("desCategoria: " + desCategoria);
	console.log("esActivo: " + esActivo);
	console.log("correo: " + localStorage.usuarioTrikas);

	var dataIn = {
		id: id,
		idCategoria: idCategoria,
		desCategoria: desCategoria,
		esActivo: esActivo,
		correo: localStorage.usuarioTrikas
	};
}

function eliminarCategoria(id, el){
	var $btnEli = $(el);
	var dataIn = {
		id: id
	};

	$.ajax({
		type: 'DELETE',
		url: 'http://localhost:3000/categoria',
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
					agregarMsj("msjValidacionGen", data, false);
				}else{
					//alert("Registro válido!");
					$btnEli.parent().parent().remove();
					agregarMsj("msjValidacionGen", "Se ha eliminado correctamente la Categoría.", true);
				}
			}else{
				agregarMsj("msjValidacionGen", "Ocurrió un error al momento de guardar la Categoría.", false);
			}
		}
	});
}