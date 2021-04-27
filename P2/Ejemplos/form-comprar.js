//-- Imprimir información sobre la solicitud recibida

const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('form-comprar.html','utf-8');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"

//-- Nombre del fichero JSON de salida
const FICHERO_JSON_OUT = "tienda-modi.json"

//-- Leer el fichero JSON
//-- de esta forma lo hacemos sincrona
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- HTML de la página de respuesta de la compra
const RESPUESTA = fs.readFileSync('form-comprar-res.html', 'utf-8');


//-- Crear la estructura tienda a partir del contenido del fichero
//-- nos devuelve la estructura del json
const tienda = JSON.parse(tienda_json);

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  //-- Construir el objeto url con la url de la solicitud
  //-- De aqui leo los metodo de la URL
  const myURL = new URL(req.url, 'http://' + req.headers['host']);  
  console.log("");
  console.log("Método: " + req.method); //-- metodo
  console.log("Recurso: " + req.url); //-- recurso
  console.log("  Ruta: " + myURL.pathname); //-- ruta sin parametros
  console.log("  Parametros: " + myURL.searchParams); //-- parametos separados

  //-- Leer los parámetros
  let direccion = myURL.searchParams.get('direccion');
  let tarjeta = myURL.searchParams.get('tarjeta');
  console.log(" Direccion de envio: " + direccion);
  console.log(" Numero de Tarjeta de credito: " + tarjeta);
  
  //-- Comprobamos si es distinto de null
  if ((direccion != null) && (tarjeta != null)){
    //-- Añadirlos al pedido
    let pedido = {"usuario" : "defecto",
                  "tarjeta" : tarjeta,
                  "direccion" : direccion,
                  "productos": "muchisimos"}

    //-- Añadir el pedido a la tienda
    tienda[2]["pedidos"].push(pedido)

    //-- Convertir la variable a cadena JSON
    //-- Convertimos de una cadena a JSON con la funcion
    //-- .stringify
    let mytienda = JSON.stringify(tienda, null, 4);

    //-- Guardarla en el fichero destino
    //-- guardamos nuestro nuevo fichero JSON
    fs.writeFileSync(FICHERO_JSON_OUT, mytienda);
  };
  

  //-- Por defecto entregar formulario
  let content_type = "text/html"; //-- le digo de que tipo es
  let content = FORMULARIO; //-- aqui por defecto siempre devolvemos el formulario

  //-- En el caso de ir /procesar mandar la respuesta
  if (myURL.pathname == '/procesar') {
        content_type = "text/html";    
        content = RESPUESTA;   
  }

  //-- Esto es un stream de flujo de datos
  //-- Si hay datos en el cuerpo, se imprimen
  req.on('data', (cuerpo) => {

    //-- Los datos del cuerpo son caracteres
    req.setEncoding('utf8');
    console.log(`Cuerpo (${cuerpo.length} bytes)`)
    console.log(` ${cuerpo}`);
  });

  //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud
  req.on('end', ()=> {
    //-- Generar respuesta
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end()
  });

});

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);