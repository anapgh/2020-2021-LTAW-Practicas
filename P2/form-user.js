//-- Imprimir información sobre la solicitud recibida

const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('form-user.html','utf-8');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"

//-- Leer el fichero JSON
//-- de esta forma lo hacemos sincrona
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- HTML de la página de respuesta  de Bienvenido
const RESPUESTAOK = fs.readFileSync('form-user-res.html', 'utf-8');

//-- HTML de la pagina de respuesta de error, cliente desconocido
const RESPUESTAERROR = fs.readFileSync('form-user-res-error.html', 'utf-8');

//-- Crear la estructura tienda a partir del contenido del fichero
//-- nos devuelve la estructura del json
const tienda = JSON.parse(tienda_json);

//-- Defino arrays
let nombre_reg = []
let apellidos_reg = []

//-- Imprimir usuarios  registrados
//-- Recorrer el json para buscar los clientes registrados
let usuarios_reg = tienda[1]["usuarios"]
for (i = 0; i < usuarios_reg.length; i++){
    nombre_reg.push(usuarios_reg[i]["nombre"])
    apellidos_reg.push(usuarios_reg[i]["apellidos"])
};

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
  let nombre = myURL.searchParams.get('nombre');
  let apellidos = myURL.searchParams.get('apellidos');
  console.log(" Nombre: " + nombre);
  console.log(" Apellidos: " + apellidos);

  //-- Por defecto entregar formulario
  let content_type = "text/html"; //-- le digo de que tipo es
  let content = FORMULARIO; //-- aqui por defecto siempre devolvemos el formulario

  //-- En el caso de ir /procesar mandar la respuesta
  if (myURL.pathname == '/procesar') {
        content_type = "text/html";
        if ((nombre_reg.includes(nombre)) && (apellidos_reg.includes(apellidos))) {
            console.log('Usuario registrado');
            content = RESPUESTAOK;
        }else{
            content = RESPUESTAERROR;
        }
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