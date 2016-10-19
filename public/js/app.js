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
	if(!(JSON.parse(localStorage.noMostrarModal)))(
		$("#modalOferta").modal();
	)

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

const $navItems = $("#navMenu").find(".nav-item");
$navItems.click(function(ev){
	alert("ingresa a navitem");
	$navItems.removeClass("active");
	const $this = $(this);
	const isActive = $this.hasClass("active");
	if(!isActive){
		$this.addClass("active");
	}
});