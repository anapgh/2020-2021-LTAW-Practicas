// -- PRACTICA 1: TIENDA ON-LINE

//-- Importo los modulos http y fs
const http = require('http');
const fs = require('fs');
const url = require('url');


//-- Definir el puerto a utilizar
const PUERTO = 9000;

//-- Cargamos la pagina de html
//-- Hacemos una lectura asincrona
const pagina = fs.readFile('tienda.html','utf8', (err, data) => {

    //-- Cuando los datos están ya disponibles
    //-- los mostramos en la consola
    console.log("Lectura completada...")
    console.log("Contenido del fichero: \n")
    console.log(data);
});

//-- Creamos el servidor
const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader('Content-Type','text/html');
    res.write(pagina); //-- Devuelvo ahora texto el HTML!!
    res.end();
});

//--Escuchamos en el puerto
server.listen(PUERTO);


console.log("Tienda on-line activada!. Escuchando en puerto: " + PUERTO);