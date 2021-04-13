//-- Imprimir información sobre la solicitud recibida

const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('form-user.html','utf-8');

//-- Pagina principal
const MAIN = fs.readFileSync('main.html', 'utf-8')

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"

//-- Leer el fichero JSON
//-- de esta forma lo hacemos sincrona
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- HTML de la página de respuesta  de Bienvenido
const RESPUESTAOK = fs.readFileSync('form-user-res.html', 'utf-8');

//-- HTML de la pagina de respuesta de error, cliente desconocido
const RESPUESTAERROR = fs.readFileSync('form-user-res-error.html', 'utf-8');

//-- HTML de login ya dentro
const LOGIN = fs.readFileSync('form-user-login.html', 'utf-8')

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

  //-- Leer la Cookie recibida y mostrarla en la consola
  const cookie = req.headers.cookie;

  //-- Variable para guardar el usuario
  let user;

  if (cookie) {
    console.log("Cookie: " + cookie);

     //-- Obtener un array con todos los pares nombre-valor
     let pares = cookie.split(";");

    //-- Recorrer todos los pares nombre-valor
    pares.forEach((element, index) => {

      //-- Obtener los nombres y valores por separado
      let [nombre, valor] = element.split('=');

      //-- Leer el usuario
      //-- Solo si el nombre es 'user'
      if (nombre.trim() === 'user') {
        user = valor;
      }
    });

    //--- Si la variable user está asignada
    if (user) {

      //-- Añadir a la página el nombre del usuario
      console.log("user: " + user);
      console.log('HAY USER COOKIE')
    }
  }
  else {
    console.log("Petición sin cookie");
  }

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

  //-- Por defecto entregar la pagina principal
  let content_type = "text/html"; //-- le digo de que tipo es
  let content; //-- contenido

  //-- Comprobar si hay cookie de ese usuario
  if(user){
    //-- Introducir su nombre en la pagina principal
    content = MAIN.replace('<a href="/login">[Login]</a>', '<h3>' + user + '</h3>')
  }else{
    //-- Pagina principal con el login
    content = MAIN; 
  }

  //-- Acceder al recurso login
  if (myURL.pathname == '/login'){
    content_type = "text/html";

    //-- Comprobamos si hay cookie de ese usuario
    if(user){
      //-- No le mandamos el formulario
      //-- Le decimos que ya esta logeado
      console.log('Hay cookie guardada, ya estas logeado')
      content = LOGIN.replace("USUARIO", user );

    }else{
      console.log('No hay cookie, hay que logearse')
      //-- Le mandamos el formulario para que se registre
      content = FORMULARIO;
    }
  }else if (myURL.pathname == '/procesar'){
    //-- Comprobamos si el usuario esta registrado en JSON, si es asi OK
    if ((nombre_reg.includes(nombre)) && (apellidos_reg.includes(apellidos))) {

      //-- LOcalizamos el indice donde se encuentra el usuario
      let index = nombre_reg.indexOf(nombre)

      //-- Extraemos el nombre de usuario
      usuario = usuarios_reg[index]["usuario"]
      console.log('User: ' + usuario)

      //-- Asignar la cookie del usuario registrado
      res.setHeader('Set-Cookie', "user=" + usuario );

      //-- Mostramos la pagina OK
      console.log('Usuario registrado');
      content = RESPUESTAOK;
      html_extra = nombre + " " + apellidos;
      content = content.replace("HTML_EXTRA", html_extra);
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