
"use strict";

var db = function(){ //Encapsulamiento de la logica de la base de datos en la variable db

  //variables globales
  var base = null,
      NOMBRE_DE_BASE = "MOVIESHEL",
      VERSION = "1.0",
      DESCRIPCION = "Mis peliculas",
      LONGITUD = 200000;

  function _abreDB() { //Abre BD que utiliza la app 
    //configuracion de la base
    base = openDatabase(NOMBRE_DE_BASE, VERSION, DESCRIPCION, LONGITUD);
    //ejecutamos la creacion de la tabla peliculas
    creaTablaPeliculas(base);
  }


  function creaTablaPeliculas() { //Crea la tabla peliculas en caso de no existir al iniciar la app
    base.transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS peliculas (id INTEGER PRIMARY KEY AUTOINCREMENT,titulo TEXT NOT NULL,\n\
        fecha TEXT NOT NULL,comentario TEXT NOT NULL,  genero NUMERIC NOT NULL , puntos NUMERIC NOT NULL)");
    });
  }

  function _insert(valores){ //Inserta valores en la tabla peliculas apartir de un array de valores
    //iniciacion de la transaction
    base.transaction(
      function(transaction) {
            //ejecucion del comando
            transaction.executeSql(
              "INSERT INTO peliculas (titulo ,fecha ,comentario ,genero ,puntos) VALUES (? , ?, ?, ?, ?)"
              ,valores
            )
          }, function(error){
            //Si hubo error
            alert('Error al guardar la pelicula.\nIntentalo nuevamente.('+error+')');
          }, function(){

          //Mensaje de success
          alert('Se guardo correctamente la pelicula!');
          document.location=('estante.html');

        }
        );
  }

  function _update(valores){ //Actualiza valores en la tabla peliculas apartir de un array de valores
    //iniciacion de la transaction
    base.transaction(
      function(transaction) {
            //ejecucion del comando
            transaction.executeSql(
              "UPDATE peliculas SET titulo=? ,fecha=? ,comentario=? ,genero=? ,puntos=? WHERE id=?"
              ,valores
            )
          }, function(error){
            //Si hubo error
            alert('Error al actualizar la pelicula.('+error+')');
          }, function(){
          //Mensaje de success
          alert('Se guardo  la actualizacion');
          document.location=('estante.html');
        }
        );
  }

  function _delete(llave){ //Elimina un registro en la tabla peliculas apartir de un array de valores
    //iniciacion de la transaction
    base.transaction(
        function(transaction) {
        //ejecucion del comando
        transaction.executeSql(
          "DELETE FROM peliculas WHERE id=?"
          ,[llave]
        )
      },function(error){
        //Si hubo error
        alert('Error al eliminar la pelicula.('+error+')');
      },function(){
        //Mensaje de success
        alert('Pelicula eliminada');
      }
    );
  }

  function _select(query,callBack){
     //iniciacion de la transaction
    base.transaction(
      function(transaction) {
        //ejecucion del comando
        transaction.executeSql(query,[],function (transaction,results){
            var resultado = [];

            //Formamos un JSON para retornarlo
            for(var i=0; i < results.rows.length; i++) {
              var fila = results.rows.item(i)
              resultado[i] = {
                id: fila['id'],
                titulo: fila['titulo'],
                fecha: fila['fecha'],
                comentario: fila['comentario'],
                genero: fila['genero'],
                puntos: fila['puntos']
              }
            }
            //con un callBack se podra acceder al resultado para manipularlo                       
            callBack(resultado);
          }
        )
      },function(error){
        //Si hubo error
        alert('Error al obtener las peliculas.('+error+')');
      }
    );

  }

  function error(evento){ //Funcion para obtener los errores en consola
    console.log(evento);
  }

  return { //Funciones que se retornan como publicas en la variable db
  //nombre de la funcion externa : nombre de la funcion interna
    insertar   :_insert,
    actualizar :_update,
    eliminar   :_delete,
    consultar  :_select,
    conectar   :_abreDB
  }

}();