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