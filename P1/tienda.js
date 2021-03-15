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

  //-- Extraigo el tipo de mime que es la ruta
  //-- me quedo con la extenson
  let ext = filename.split(".")[1]

  //-- Escribimos el tipo de mime pedido
  console.log('Tipo de dato pedido: ' + ext)

  //-- Definimos los tipos de mime
  const mimeType = {
    "html" : "text/html",
    "css"  : "text/css",
    "jpg"  : "image/jpg",
    "jpeg" : "image/jpeg",
    "png"  : "image/png",
    "gif"  : "image/gif"
  }

  //-- Asignamos que tipo de mime leer
  let mime = mimeType[ext]
  console.log("mime: " + mime)

  fs.readFile(filename, function(err, data){
   
    //-- Controlar si la pagina es no encontrada.
    //-- Devolvemos nuesta pagina de error, 404 NOT FOUND
    if (err){
      res.writeHead(404, {'Content-Type': mime});
      console.log("Not found")
    }else{
      //-- Todo correcto
      //-- Manda el mensaje 200 OK
      res.writeHead(200, {'Content-Type': mime});
      console.log("Peticion Atendida, 200 OK")
    } 
    //-- Enviamos los datos del fichero solicitado  
    res.write(data);
    res.end();
  });
});

//-- Activar el servidor
server.listen(PUERTO);

//-- Mensaje de inicio
console.log("La Pastelería de Ana pi!. Escuchando en puerto: " + PUERTO);