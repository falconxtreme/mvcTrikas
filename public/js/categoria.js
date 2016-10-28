$(document).ready(function(){
	$("#frmAddCategory").submit(function(ev){
		ev.preventDefault();
		guardarCategoria();
	})

	function guardarCategoria(){
		console.log("ingresa a guardarCategoria----");
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
						alert("Registro inválido! " + data);
					}else{
						alert("Registro válido!");
					}
				}else{
					alert("Registro inválido!");
				}
				console.log(data);				
			}
		});
		console.log("termina a guardarCategoria----");
	};
});