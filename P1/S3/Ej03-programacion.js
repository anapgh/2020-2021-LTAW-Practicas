const http = require('http');

const PUERTO = 8080;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("\nMENSAJE A")

  //-- Si hay datos en el cuerpo, se imprimen
  //-- Pendiente de si llegan datos
  //-- Cuando lleguen datos, ejecuta la funcion de retrollamada 'cuerpo'
  req.on('data', (cuerpo) => {
    console.log("MENSAJE B") //-- Nos escribirá por consola ese mensaje
  });

  //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud
  //-- o si no hay cuerpo.
  req.on('end', ()=> {
    console.log("MENSAJE C");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

  console.log("MENSAJE D");

});

console.log("MENSAJE E");
server.listen(PUERTO);
console.log("MENSAJE F");

//-- Situacion1:
    //-- Se arranca el servidor. 
    //-- Se recibe una solicitud del cliente de tipo GET, sin cuerpo en el mensaje
    //------
    //-- Si no tiene cuerpo NUNCA va a llegar el mensaje B
    //-- Los mensajes E y F son los primeros que se aparecen al lanzar el servidor
    //-- y se imprimen en orden. Primero se crea el servidor con createServer. 
    //-- Después se imprime el mensaje E. 
    //-- A continuación se pone el servidor en modo escuchaesperando a recibir peticiones. 
    //-- En paralelo se escrie el mensaje F
    //-- Ahora, cuando llega la petición se llama a la función de retrollamda y se imprime
    //-- el mensaje A. 
    //-- Se establecen dos funciones de retrollamada adicionales, los eventos data y end
    //-- pero NO SE EJECUTAN. 
    //-- Node sigue ejecutando instrucciones hasta mensaje D y se queda esperando algún evento
    //-- La petición no tiene cuerpo, por lo que se genera el evento end y se imprime el mensaje D
    //-- Por lo que quedaría así:
    //-- MENSAJE E
    //-- MENSAJE F
    //--
    //-- MENSAJE A
    //-- MENSAJE D
    //-- MENSAJE C

//-- Situación 2: 
    //-- Tras la situación anterior:
    //-- se recibe ahora una solicitud que tiene información en el cuerpo
    //------
    //-- Ahora, cuando llega la petición se llama a la función de retrollamda y se imprime
    //-- el mensaje A. 
    //-- Se establecen dos funciones de retrollamada adicionales, los eventos data y end
    //-- pero NO SE EJECUTAN. 
    //-- Node sigue ejecutando instrucciones hasta mensaje D y se queda esperando algún evento
    //-- La petición nueva SI tiene cuerpo, por lo que se genera el evento 'data'
    //-- Se imprime el mensaje A
    //-- Tras finalizar el mensaje de solicitud entra al evento 'end' e imprime C
    //-- Por lo que quedaría así:
    //-- MENSAJE A
    //-- MENSAJE D
    //-- MENSAJE B
    //-- MENSAJE C
    