// -- PRACTICA 1: TIENDA ON-LINE

//-- Importo los modulos http, fs y url
const http = require('http');
const fs = require('fs');
const url = require('url');

//-- Definir el puerto a utilizar
const PUERTO = 9000;

//-- Mensaje de arranque
console.log("Arrancando servidor...")

//-- Crear el sevidor
const server = http.createServer(function (req, res) {

  //-- Indicamos que se ha recibido una peticion
  console.log("Peticion Recibida");

  //-- Creamos el objeto URL del mensaje de solitud (req)
  //-- cogemos el recurso (url)
  let myURL = url.parse(req.url, true);

  //-- Escribimos en consola la ruta de nuestro recurso
  console.log("Recurso recibido: " + myURL.pathname)

  //-- Definimos una variable fichero
  let filename = ""

  //-- Sacamos la ruta (pathname)
  //-- Comprobamos si la rut es elemento raiz
  if (myURL.pathname == "/"){
    filename += "/tienda.html"  //-- Abrimos la pagina principal
  }else{
    filename += myURL.pathname  //-- Abrimos la ruta solicitada
  }

  //-- Ruta asignada
  console.log('Ruta: ' + filename)
  
});

//-- Activar el servidor
server.listen(PUERTO);

//-- Mensaje de inicio
console.log("Tienda on-line activada!. Escuchando en puerto: " + PUERTO);