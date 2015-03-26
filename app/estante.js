"use strict";

$(function(){

    // Obtenemos la preferencia de usuario del fondo
    var value = window.localStorage.getItem("fondo");
        
    if(value==null){
        // Si no a seleccionado fondo se le pone el default
        $("#contenedor_estante").css({'background-image': 'url(media/img/fondos/bg.png)'});
    }else{
        // Si ya tiene un fondo entonces le pongo su fondo
        $("#contenedor_estante").css({'background-image': 'url(media/img/fondos/'+value+')'});
    }

    //cargamos las peliculas en el estante
    creaEstante();

    //desactivar menu contextual cuando presionemos largo para eliminar una pelicula
    window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};
});

//Funcion para guardar Peliculas
function creaEstante(){
    //conectamos a la base de datos
    db.conectar();
    //realizamos consulta y manipulamos los datos para formar el estante
    db.consultar("SELECT id, titulo ,fecha ,comentario ,genero ,puntos FROM peliculas ORDER BY titulo"
        ,function(peliculas){   

        //Borramos el contenido del contenedor de peliculas
        $("#contenedor_estante").html('');

        //iteracion de los resultados para formar cada portda de pelicula
        for (var i=0; i<peliculas.length;i++ ){
            //la fila seria pelicuas[i]
            //la columna seria peliculas[i]['nombrecolumna']

            //Formo el html por cada pelicula
            var htmlPelicula = '<div class="tile bd-dark size-manual" data-click="transform"> \
                                    <a href="editarCinta.html?id='+peliculas[i]['id']+'"> \
                                        <div class="tile-content image">  \
                                            <img id="'+peliculas[i]['id']+'" name="'+peliculas[i]['titulo']+'" src="media/img/caratulas/'+peliculas[i]['genero']+'.jpg"> \
                                        </div> \
                                        <div class="brand bg-black opacity"> \
                                            <span class="label">'+peliculas[i]['titulo']+
                                                '<div class="badge"> \
                                                    <i class="icon-star-3">'+peliculas[i]['puntos']+'</i> \
                                                </div> \
                                            </span> \
                                        </div> \
                                    </a> \
                                </div>';
        
            //Agrego el html al estante
            $("#contenedor_estante").append(htmlPelicula);
        }


// FUNCIONES PARA DETECTAR EL EVENTO TOUCH LARGO 
// AL QUERER ELIMINAR UNA PELICULA
// extraido de http://jsfiddle.net/kelunik/pkjze6e6/10/

var longpress = false;
var presstimer = null;
var longtarget = null;

var cancel = function(e) {
    if(presstimer !== null) {
        clearTimeout(presstimer);
    }
};

var click = function(e) {
    if(presstimer !== null) {
        clearTimeout(presstimer);
    }
        
    if(longpress) {
        return false;
    }
    
   
};

var start = function(e) {

    if(e.type === "click" && e.button !== 0) {
        return;
    }
    
    longpress = false;
        
    presstimer = setTimeout(function() {
        var nombrePelicula = e.toElement.name,
            idPelicula     = e.toElement.id;
            console.log(e);
        // SI SE DETECTA UNA PRESION DE 1000 MILISEGUNDOS EJECUTO LO SIGUIENTE
        var respuestaBorrado = confirm( "¿Desea borrar la pelicula '" + nombrePelicula + "' ? "); 
        if (respuestaBorrado===true) {
            //Si acepto la alerta de confirmacion para eliminar entonces 
            //elimino la pelicula en la base de datos y recargo el estante de peliculas
            db.eliminar(idPelicula);
            creaEstante();
        };
        longpress = true;
    }, 1000);
    
    return false;
};

var node = document.getElementsByClassName("tile");

    for (var i = 0; i < node.length; i++) {
    
node[i].addEventListener("mousedown", start);
node[i].addEventListener("touchstart", start);
node[i].addEventListener("click", click);
node[i].addEventListener("mouseout", cancel);
node[i].addEventListener("touchend", cancel);
node[i].addEventListener("touchleave", cancel);
node[i].addEventListener("touchcancel", cancel);
};


    });
}


    


