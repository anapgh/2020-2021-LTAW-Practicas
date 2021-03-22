//-- Imprimir parametros en la respuesta

const http = require('http');
const fs = require('fs');
const PUERTO = 8082;

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('form3.html','utf-8');

//-- HTML de la página de respuesta
const RESPUESTA = fs.readFileSync('form3-resp.html', 'utf-8');
const server = http.createServer((req, res) => {

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);  
  
    //-- Leer los parámetros
    let nombre = myURL.searchParams.get('nombre');
    let apellidos = myURL.searchParams.get('apellidos');
    console.log(" Nombre: " + nombre);
    console.log(" Apellidos: " + apellidos);
    
  
    //-- Por defecto entregar formulario
    let content_type = "text/html";
    let content = FORMULARIO;
  
    if (myURL.pathname == '/procesar') {
        content_type = "text/html";
  
        //-- Reemplazar las palabras claves por su valores
        //-- en la plantilla HTML
        //-- Me genera variable content
        content = RESPUESTA.replace("NOMBRE", nombre);
        content = content.replace("APELLIDOS", apellidos);
  
        //-- si el usuario es AnaPoveda Garcia se añade HTML extra
        let html_extra = "";
        if (nombre=="AnaPoveda" && apellidos=="Garcia") {
           html_extra = "<h2>AnaPoveda Garcia no necesita registrarse</h2>";
        }
        content = content.replace("HTML_EXTRA", html_extra);
    }
  
    //-- Enviar la respuesta
    //-- la respuesta no cambia
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end()
  
  });
  
  server.listen(PUERTO);
  console.log("Escuchando en puerto: " + PUERTO);
