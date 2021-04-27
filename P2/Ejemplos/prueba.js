//-- Servidor JSON

const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

//-- Cargar la Página de error
const ERROR = fs.readFileSync('error_page.html');

//-- Cargar pagina web principal
const MAIN = fs.readFileSync('prueba.html','utf-8');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = ("tienda.json");

//-- Leer el fichero JSON
//-- de esta forma lo hacemos sincrona
const tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
//-- nos devuelve la estructura del json
const tienda = JSON.parse(tienda_json);

// Obtenemos los productos
key = tienda[0]
set = key["productos"]
//-- Array de productos
let productos = []
for (i=0; i<set.length; i++){
    productos.push(set[i]["nombre"])
}
console.log(productos)

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);  

    //-- Variables para el mensaje de respuesta
    let content_type = "text/html";
    let content = "";
  
    //-- Leer recurso y eliminar la / inicial
    let recurso = myURL.pathname;
    recurso = recurso.substr(1); 

    switch (recurso) {
        case '':
            console.log("Main page");
            content = MAIN;
            break;

        //-- Recurso productos
        //-- Ahora vamos a tener en cuenta las busquedas
        case 'productos':
            console.log("Peticion de Productos!")
            content_type = "application/json";

            //-- Leer los parámetros
            let param1 = myURL.searchParams.get('param1');

            //-- Convertimos los caracteres alphanumericos en string
            param1 = param1.toUpperCase();

            console.log("  Param: " +  param1);

            //-- Se construye nuevo Array de resultado de busquedas
            let result = [];

            //-- Para ello
            //-- Recorremos todos los productos de la bae de datos
            //-- Y los que cuadren, se añaden al array
            for (let prod of productos) {

                //-- Pasar a mayúsculas
                prodU = prod.toUpperCase();

                //-- Si el producto comienza por lo indicado en el parametro
                //-- meter este producto en el array de resultados
                if (prodU.startsWith(param1)) {
                    result.push(prod);
                }
                
            }
            //-- Imprimimos el aray de resultado de busquedas
            console.log(result);
            //-- Pasamos el resultado a formato JSON con stringify
            content = JSON.stringify(result);
            break;

        case 'cliente.js':
            //-- Leer fichero javascript
            console.log("recurso: " + recurso);
            fs.readFile(recurso, 'utf-8', (err,data) => {
                if (err) {
                    console.log("Error: " + err)
                    return;
                } else {
                  res.setHeader('Content-Type', 'application/javascript');
                  res.write(data);
                  res.end();
                }
            });
            
            return;
            break;

            //-- Si no es ninguna de las anteriores devolver mensaje de error
        default:
            res.setHeader('Content-Type','text/html');
            res.statusCode = 404;
            res.write(ERROR);
            res.end();
            return;
    }
  
    //-- Generar respuesta
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end()
  
  });
  
  server.listen(PUERTO);
  console.log("Escuchando en puerto: " + PUERTO);