$(function(){
    

    //Evento para cambiar fondo de estante
    $("#fondos img").on("click",function(){
        // Se obtiene solo el nombre de la img de fondo
        var src = this.src.split('/');
        var img = src[src.length - 1];
        //nombre del fondo anterior y del nuevo
        var nombreViejo = window.localStorage.getItem("fondo").split(".",1)[0];
        var nombreNuevo = img.split(".",1)[0];

        //se elimina el fondo anterior de la preferencias localstorage
        window.localStorage.removeItem("fondo");
        //Quito clase selected a fondo anterior
        $("#"+nombreViejo).removeClass("selected");

        //se agregar el fondo nuevo en las preferencias localstorage
        window.localStorage.setItem("fondo", img);
        //Agrego la clase selected al fondo seleccionado
        $("#"+nombreNuevo).addClass("selected");

    });

    // Al entrar a ajustes resaltara el fondo que tenemos configurado
    var nombreFondo = window.localStorage.getItem("fondo");
    if(nombreFondo!==null){
    	var nombreIMG = nombreFondo.split(".",1)[0];
        //con el nombre le pondremos la clase select a la imagen
        $("#"+nombreIMG).addClass("selected");
    }else{	
    	window.localStorage.setItem("fondo", "bg.png");
    	$("#bg").addClass("selected");
    }
	
 });
