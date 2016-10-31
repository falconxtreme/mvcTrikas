$(document).ready(function(){
	$("#frmAddCategory").submit(function(ev){
		ev.preventDefault();
		guardarCategoria();
	});

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

}

function eliminarCategoria(id, el){
	console.log("ingersa a eliminarCategoria***************");
	console.log(el);
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