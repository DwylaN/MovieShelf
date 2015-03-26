
"use strict";
$(function(){

    //obtenemos la variable id por URL
    idURL = location.search.substr( location.search.indexOf("=") + 1 );
    //se rellenan los datos del formulario
    cargaDatosPeliculaExistente(idURL);

});

var idURL = null;

//Funcion para llenar los campos del formurario del registro que se va a editar 
//Mediante una consulta a la db
function cargaDatosPeliculaExistente(idURL){
    //conectamos a la base
    db.conectar();
    //hacemos la consulta y concatenamos el id con el id= del select
    db.consultar("SELECT id, titulo ,fecha ,comentario ,genero ,puntos FROM peliculas WHERE id="+idURL
        ,function(pelicula){

            //Obtenemos los datos de los elementos del form
            document.getElementById('titulo').value = pelicula[0]['titulo'];
            document.getElementById('fecha').value  = pelicula[0]['fecha'];
            document.getElementById('comentario').value = pelicula[0]['comentario'];
            document.getElementById('genero').value = pelicula[0]['genero'];

            //se inicializa el Raiting
            $("#puntos").rating({
                static: false,
                score: pelicula[0]['puntos'],//Se colorean las estrellas
                stars: 5,
                showHint: true,
                showScore: false,
                click: function(value, rating){
                    //Poner puntos en data-puntos html
                    $("#puntos").attr('data-puntos', value);
                    rating.rate(value);
                }
            });
            //Se carga el valor de los puntos segun la db
            $("#puntos").attr('data-puntos',pelicula[0]['puntos']);

    });
}


//Funcion para actualizar Peliculas
function actualizarCinta(){
    //Obtenemos los datos de los elementos del formulario de edicion
    var titulo = document.getElementById('titulo'),
    fecha      = document.getElementById('fecha'),
    comentario = document.getElementById('comentario'),
    genero     = document.getElementById('genero'),
    puntos     = $("#puntos").attr('data-puntos'),
    id         = idURL;


    //Formateamos los valores para enviarlos a la db
    var datosCintaEditada = [
        titulo.value,
        fecha.value,
        comentario.value,
        genero.value,
        puntos,
        id];

    //Conectamos a la base 
    db.conectar();
    //Realizamos la actualizacion de los datos
    db.actualizar(datosCintaEditada);

}