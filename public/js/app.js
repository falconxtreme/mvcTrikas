$(document).ready(function(){
	const $form= $("#suscribirForm");
	const $formGroup = $form.find(".form-group");
	const $formControl = $formGroup.find(".form-control");
	
	$form.submit(function(ev){
		ev.preventDefault();

		const error = Math.random() > 0.5;
		$formGroup.removeClass().addClass("form-group");
		$formControl.removeClass().addClass("form-control");

		$formGroup.find(".form-control-feedback").remove();
		var el;
		if(error){
			el = $("<div>", {html: "Ha ocurrido un error"});
			$formGroup.addClass("has-danger");
			$formControl.addClass("form-control-danger");
		} else{
			el = $("<div>", {html: "Te enviaremos todas la novedades"});
			$formGroup.addClass("has-success");
			$formControl.addClass("form-control-success");
		}
		el.addClass("form-control-feedback");
		$formGroup.append(el);
	}); 

	function mostrarModal(){
		if(!(JSON.parse(localStorage.noMostrarModal))){
			$("#modalOferta").modal();
		}
		

		$("#btnNoRegistrar").click(function (ev){
			localStorage.noMostrarModal = true;
		});
	}

	const $filtrosToggle = $("#filtrosToggle");
	$filtrosToggle.click(function(ev){
		ev.preventDefault();

		const $i = $filtrosToggle.find("i.fa");
		const isDown = $i.hasClass("fa-chevron-down");
		if(isDown){
			$i.removeClass("fa-chevron-down").addClass("fa-chevron-up");
		}else{
			$i.removeClass("fa-chevron-up").addClass("fa-chevron-down");
		}
	});

	/*------LOGIN MODAL--------*/
	$('#btnLoginOk').click(function(){
		var button = $(this);

		if ( button.attr("data-dismiss") != "modal" ){
			var inputs = $('form input');
			var title = $('#lblTituloAcceso');
			var progress = $('#progLogin');


			inputs.attr("disabled", "disabled");
			button.hide();
			progress.css("display", "block");
			var elem = document.getElementById("barLogin");
			var width = 1;
			var id = setInterval(frame, 10);
			function frame() {
				if (width >= 100) {
			    	clearInterval(id);
			      	progress.css("display", "none");
			    } else {
			      	width++;
			      	elem.style.width = width + '%';
			    }
		  	}
		  	autenticarUsuario(id, progress, button, title);
		}
	});

	$('#btnLoginRegOk').click(function(){
		var msjValReg = validarCamposRegistro();
		if(msjValReg==""){
			var button = $(this);

			if ( button.attr("data-dismiss") != "modal" ){
				var inputs = $('form input');
				var title = $('#lblTituloRegistro');
				var progress = $('#progLoginReg');


				inputs.attr("disabled", "disabled");
				button.hide();
				progress.css("display", "block");
				var elem = document.getElementById("barLoginReg");
				var width = 1;
				var id = setInterval(frame, 10);
				function frame() {
					if (width >= 100) {
				    	clearInterval(id);
				      	progress.css("display", "none");
				    } else {
				      	width++;
				      	elem.style.width = width + '%';
				    }
			  	}
			  	registrarUsuario(id, progress, button, title);
			}
		}else{
			var title = $('#lblTituloRegistro');
			title.text(msjValReg);
		}
		
	});

	$('#loginMod').on('hidden.bs.modal', function (e) {
		var inputs = $('form input');
		var titleAc = $('#lblTituloAcceso');
		var titleRe = $('#lblTituloRegistro');
		var progressBar = $('.progress-bar');
		var button = $('#btnLoginOk');
		var buttonRe = $('#btnLoginRegOk');

		inputs.removeAttr("disabled");

		titleAc.text("Acceso");
		titleRe.text("Registro");

		progressBar.css({ "width" : "0%" });

		button.removeClass("btn-success")
				.addClass("btn-primary")
				.text("Acceder")
				.removeAttr("data-dismiss");
		buttonRe.removeClass("btn-success")
				.addClass("btn-primary")
				.text("Registrar")
				.removeAttr("data-dismiss");
                
	});

	function autenticarUsuario(idInterval, progress, button, title){
		console.log("ingresa a autenticarUsuario----");
		var inputs = $('form input');
		var correo = $("#uLogin").val();
		var password = $("#uPassword").val();
		var token = "";

		var dataIn = {
			correo: correo,
			contrasenha: password,
			token: token
		};
		console.log("autenti correo: " + correo);
		console.log("autenti contras: " + password);
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/usuario/autenticacion',
			data: dataIn,
			async: false,
			beforeSend: function(xhr){
				if(xhr && xhr.overrideMimeType){
					xhr.overrideMimeType('application/json;charset=utf-8');
				}
			},
			dataType: 'json',
			success: function(data){
				clearInterval(idInterval);
			    progress.css("display", "none");
				if(data){
					if(typeof (data) == 'string'){
						title.text("Acceso denegado!");
						localStorage.usuarioAutenticadoTrikas = false;
						button.show();
						inputs.removeAttr("disabled");
					}else{
						localStorage.usuarioTrikas = correo;
						localStorage.usuarioAutenticadoTrikas = true;
						button.text("Close")
							.removeClass("btn-primary")
							.addClass("btn-success")
		    				.blur()
							.fadeIn(function(){
								title.text("Acceso autorizado");
								button.attr("data-dismiss", "modal");
							});
					}
				}else{
					title.text("Acceso denegado");
					button.show();
					inputs.removeAttr("disabled");
				}
				console.log(data);				
			}
		});
	};

	function patronMail(){
		return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
	}

	function patronPassword(){
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
	}
	function validarCamposRegistro(){
		var correo = $("#uLoginReg").val().trim();
		var password = $("#uPasswordReg").val().trim();
		var repassword = $("#uRePasswordReg").val().trim();
		var patMail = patronMail();

		if(correo=="" || password=="" || repassword==""){
			return "Ningún campo puede estar vacío."
		}else if(!patMail.test(correo)){
			return "Ingresar un correo válido."
		}else if(password.indexOf(" ")>=0 || repassword.indexOf(" ")>=0){
			return "La contraseña no puede contener espacios."
		}else if(password!=repassword){
			return "La contraseña y la contraseña confirmada deben ser iguales."
		}
		return "";
	}

	function registrarUsuario(idInterval, progress, button, title){
		console.log("ingresa a registrarUsuario----");
		var inputs = $('form input');
		var correo = $("#uLoginReg").val().trim();
		var password = $("#uPasswordReg").val().trim();
		var token = "";

		var dataIn = {
			correo: correo,
			contrasenha: password,
			token: token
		};

		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/usuario',
			data: dataIn,
			async: false,
			beforeSend: function(xhr){
				if(xhr && xhr.overrideMimeType){
					xhr.overrideMimeType('application/json;charset=utf-8');
				}
			},
			dataType: 'json',
			success: function(data){
				clearInterval(idInterval);
			    progress.css("display", "none");
				if(data){
					if(typeof (data) == 'string'){
						title.text("Registro inválido! " + data);
						localStorage.usuarioAutenticadoTrikas = false;
						button.show();
						inputs.removeAttr("disabled");
					}else{
						localStorage.usuarioTrikas = correo;
						localStorage.usuarioAutenticadoTrikas = true;
						button.text("Close")
							.removeClass("btn-primary")
							.addClass("btn-success")
		    				.blur()
							.fadeIn(function(){
								title.text("Registro válido");
								button.attr("data-dismiss", "modal");
							});
					}
				}else{
					title.text("Registro inválido!");
					button.show();
					inputs.removeAttr("disabled");
				}
				console.log(data);				
			}
		});
		console.log("termina a registrarUsuario----");
	};
});

/*button.text("Close")
					.removeClass("btn-primary")
					.addClass("btn-success")
    				.blur()
					.delay(1200)
					.fadeIn(function(){
						title.text("Acceso autorizado");
						button.attr("data-dismiss", "modal");
					});*/