"use strict";

$(function(){

	//Inicializamos el raiting
	$("#puntos").rating({
		static: false,
		score: 0,
		stars: 5,
		showHint: true,
		showScore: false,
		click: function(value, rating){
			//Poner puntos en data-puntos html
			$("#puntos").attr('data-puntos', value);
			rating.rate(value);
		}
	});
});

//Funcion para guardar Peliculas
function guardarCinta(){
	//Obtenemos los datos de los elementos del form
	var titulo = document.getElementById('titulo'),
	fecha 	   = document.getElementById('fecha'),
	comentario = document.getElementById('comentario'),
	genero     = document.getElementById('genero'),
	puntos     = $("#puntos").attr('data-puntos');

	//Formateamos los valores para enviarlos a la db
	var datosCintaNueva = [
		titulo.value,
		fecha.value,
		comentario.value,
		genero.value,
		puntos];

	//Realizamos la insercion de los datos
	db.conectar();
	//Ejecutamos el insert de los datos
	db.insertar(datosCintaNueva);
}


