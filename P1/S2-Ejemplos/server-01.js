//--  Importando el modulo http

const http = require('http');

for (p in http) {
    console.log("Propiedad: " + p);

}

//-- Creamos el servidor: http.createServer()
http.createServer

//-- Funcion de retrollamada para atender peticiones
//-- Función de retrollamada de petición recibida
//-- Cada vez que un cliente realiza una petición
//-- Se llama a esta función
function atender(req, res) {
    //-- req: http.IncomingMessage: Mensaje de solicitud
    //-- res: http.ServerResponse: Mensaje de respuesta (vacío)

    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida!");

    //-- pero no enviamos respusta (todavía)
}