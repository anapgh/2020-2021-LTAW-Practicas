// -- PRACTICA 1: TIENDA ON-LINE

//-- Importo los modulos http, fs y url
const http = require('http');
const fs = require('fs');
const url = require('url');


//-- Definir el puerto a utilizar
const PUERTO = 9000;

console.log("Arrancando servidor...")
//var fs=require('fs');
//var data=fs.readFileSync('products.json', 'utf8');
//var words=JSON.parse(data);
//MIRAR SI FUNCIONA POR QUE ESTO ES UNA MIERDA....
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;

  if (q.pathname == ('/')){
    filename = "tienda.html";
  }
  
  fs.readFile(filename, function(err, data){

    //Control por si el server no funciona.
    if (err){
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Fount");
    }

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
  console.log("Peticion Atendida")
  });
}).listen(PUERTO);


console.log("Tienda on-line activada!. Escuchando en puerto: " + PUERTO);