const http = require('http');

const PUERTO = 8080;

//-- Imprimir informacion sobre el mensaje de solicitud
function print_info_req(req) {

    console.log("");
    console.log("Mensaje de solicitud");
    console.log("====================");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("Version: " + req.httpVersion)
    console.log("Cabeceras: "); // -- El tamaño es variable

    //-- Recorrer todas las cabeceras disponislbes
    //-- imprimiendo su nombre y su valor
    //-- Es un objeto que contiene el nombre y el valor de la cabecera
    for (hname in req.headers)
      console.log(`  * ${hname}: ${req.headers[hname]}`);

    //-- Construir el objeto url con la url de la solicitud
    //-- Nombre del recurso (primer parametro) + Origen (segundo parámetro)
    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("URL completa: " + myURL.href);
    console.log("  Ruta: " + myURL.pathname);
}

//-- SERVIDOR: Bucle principal de atención a clientes
//-- Queremos ver si en el mensaje tenemos información en el cuerpo
const server = http.createServer((req, res) => {

  //-- Petición recibida
  //-- Imprimir información de la petición
  print_info_req(req);

  //-- Si hay datos en el cuerpo, se imprimen
  //-- Pendiente de si llegan datos
  //-- Cuando lleguen datos, ejecuta la funcion de retrollamada 'cuerpo'
  req.on('data', (cuerpo) => {

    //-- Los datos del cuerpo son caracteres
    //-- Supon que lo que llega en el cuerpo es texto
    req.setEncoding('utf8');

    console.log("Cuerpo: ")
    console.log(` * Tamaño: ${cuerpo.length} bytes`);
    console.log(` * Contenido: ${cuerpo}`);
  });

  //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud
  req.on('end', ()=> {
    console.log("Fin del mensaje");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

});

server.listen(PUERTO);

console.log("Ejemplo 2. Happy Server listo!. Escuchando en puerto: " + PUERTO);