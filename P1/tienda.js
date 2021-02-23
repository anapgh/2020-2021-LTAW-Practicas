// -- PRACTICA 1: TIENDA ON-LINE

//-- Importo los modulos http y fs
const http = require('http');
const fs = require('fs');

//-- Definir el puerto a utilizar
const PUERTO = 8080;

//-- Crear el servidor
const server = http.createServer((req, res) => {
    
  //-- Indicamos que se ha recibido una petición
  console.log("Petición recibida!");

  //-- Cabecera que indica el tipo de datos del
  //-- cuerpo de la respuesta: Texto plano
  res.setHeader('Content-Type', 'text/plain');

  //-- Mensaje del cuerpo
  res.write("Soy tu tienda on-line\n");

  //-- Terminar la respuesta y enviarla
  res.end();
});

//-- Activar el servidor: 
server.listen(PUERTO);

console.log("Tienda on-line activada!. Escuchando en puerto: " + PUERTO);