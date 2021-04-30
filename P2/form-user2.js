//-- Imprimir información sobre la solicitud recibida

const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('form-user.html','utf-8');

//-- Pagina principal
const MAIN = fs.readFileSync('main.html', 'utf-8');

//-- Pagina error
const ERROR = fs.readFileSync('error_page.html', 'utf-8');

//-- Pagina del producto 1
const PRODUCTO1 = fs.readFileSync('product1.html', 'utf-8');

//-- Pagina del producto 2
const PRODUCTO2 = fs.readFileSync('product2.html', 'utf-8');

//-- Pagina del producto 3
const PRODUCTO3 = fs.readFileSync('product3.html', 'utf-8');

//-- Pagina del producto 4
const PRODUCTO4 = fs.readFileSync('product4.html', 'utf-8');

//-- Pagina del producto 5
const PRODUCTO5 = fs.readFileSync('product5.html', 'utf-8');

//-- Pagina del carrito
const CARRO = fs.readFileSync('carrito.html', 'utf-8');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = ("tienda.json");

//-- Leer el fichero JSON
//-- de esta forma lo hacemos sincrona
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Nombre del fichero JSON de salida
const FICHERO_JSON_OUT = "tienda-modi.json"

//-- HTML de la página de respuesta  de Bienvenido
const RESPUESTAOK = fs.readFileSync('form-user-res.html', 'utf-8');

//-- HTML de la pagina de respuesta de error, cliente desconocido
const RESPUESTAERROR = fs.readFileSync('form-user-res-error.html', 'utf-8');

//-- HTML de login ya dentro
const LOGIN = fs.readFileSync('form-user-login.html', 'utf-8')

//-- Cargar pagina web del formulario
const COMPRAR = fs.readFileSync('form-comprar.html','utf-8');

//-- HTML de la página de respuesta de la compra
const RESPUESTACOMP = fs.readFileSync('form-comprar-res.html', 'utf-8');


//-- Crear la estructura tienda a partir del contenido del fichero
//-- nos devuelve la estructura del json
const tienda = JSON.parse(tienda_json);

//-- Defino arrays
let nombre_reg = [];
let password_reg = [];

//-- Imprimir usuarios  registrados
//-- Recorrer el json para buscar los clientes registrados
let usuarios_reg = tienda[1]["usuarios"];
for (i = 0; i < usuarios_reg.length; i++){
    nombre_reg.push(usuarios_reg[i]["usuario"]);
    password_reg.push(usuarios_reg[i]["password"]);
};

//-- Array de productos
let productos = [];
let list_productos;
let productos_carrito;

// Obtenemos los productos del json
prod = tienda[0]["productos"]
//-- Array de productos del json
let productos_json = []
//-- Array de descripciones
let descripcion = [];
//-- Array de precios
let precio = [];
for (i=0; i<prod.length; i++){
  key = Object.keys(prod[i])[0]
  producto = prod[i]
  list = producto[key]
  descripcion[key] = [];
  precio[key] = [];
  for (j=0; j<list.length; j++){
    nombre = list[j]["nombre"]
    descrip = list[j]["descripcion"]
    prec = list[j]["precio"]
    productos_json.push(nombre);
    descripcion[key].push(descrip);
    precio[key].push(prec)
  }
}
console.log(productos_json)

//-- Definir los tipos de mime
const mime_type = {
  "html" : "text/html",
  "css"  : "text/css",
  "js"   : "application/javascript",
  "jpg"  : "image/jpg",
  "JPG"  : "image/jpg",
  "jpeg" : "image/jpeg",
  "png"  : "image/png",
  "gif"  : "image/gif",
  "ico"  : "image/x-icon",
  "json" : "application/json",
  "ttf"  : "font/ttf"
};

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log('\nPeticion recibida');
  
  //-- Leer la Cookie recibida y mostrarla en la consola
  const cookie = req.headers.cookie;

  //-- Variable para guardar el usuario
  let user;

  //-- Variable para guardar el carrito
  let carrito;

  //-- Comprobamos si hay cookies
  if (cookie) {
    console.log("Cookie: " + cookie);

    //-- Obtener un array con todos los pares nombre-valor
    let pares = cookie.split(";");

    //-- Recorrer todos los pares nombre-valor
    pares.forEach((element, index) => {

    //-- Obtener los nombres y valores por separado
    let [nombre, valor] = element.split('=');

    //-- Leer nombres
    //-- Solo si el nombre es 'user'
    if (nombre.trim() === 'user') {
      user = valor;
    //-- Si el nombre es 'carrito'
    }else if (nombre.trim() === 'carrito') {
      carrito = valor;
    }
  });
  }else {
    console.log("Petición sin cookie");
  }

  //-- Construir el objeto url con la url de la solicitud
  //-- De aqui leo los metodo de la URL
  const myURL = new URL(req.url, 'http://' + req.headers['host']);  
  console.log("");
  console.log("Método: " + req.method); //-- metodo
  console.log("Recurso: " + req.url); //-- recurso
  console.log("Ruta: " + myURL.pathname); //-- ruta sin parametros
  console.log("Parametros: " + myURL.searchParams); //-- parametos separados

  //-- Leer los parámetros
  let nombre = myURL.searchParams.get('nombre');
  let password = myURL.searchParams.get('password');
  let direccion = myURL.searchParams.get('direccion');
  let tarjeta = myURL.searchParams.get('tarjeta');
  console.log(" Nombre usuario: " + nombre);
  console.log(" Password: " + password);
  console.log(" Direccion de envio: " + direccion);
  console.log(" Numero de Tarjeta de credito: " + tarjeta);

  //-- Comprobamos si la direccion y tarjeta es distinto de null
  if ((direccion != null) && (tarjeta != null)){
    //-- Añadirlos al pedido
    let pedido = {"usuario" : user,
                  "tarjeta" : tarjeta,
                  "direccion" : direccion,
                  "productos": list_productos}

    //-- Añadir el pedido a la tienda
    tienda[2]["pedidos"].push(pedido)
 
    //-- Convertir la variable a cadena JSON
    let mytienda = JSON.stringify(tienda, null, 4);

    //-- Guardarla en el fichero destino
    fs.writeFileSync(FICHERO_JSON_OUT, mytienda);
  };

  //-- Por defecto entregar texto html
  let content_type = mime_type["html"]; 
  //-- Contenido solicitado
  let content; 

  //-- Comprobamos las rutas solicitadas
  //-- Acceder al recurso raiz
  if(myURL.pathname == '/'){
     //-- Comprobar si hay cookie de ese usuario
    if(user){
    //-- Introducir su nombre en la pagina principal
      content = MAIN.replace('<h3></h3>', '<h3> Usuario: ' + user + '</h3>');
      content = content.replace('<b></b>',
                                '<a  class= "elemen" href="/comprar">Finalizar Comprar</a>');
    }else{
      //-- Pagina principal con el login
      content = MAIN; 
    }
  
  //-- Acceder al recurso login
  }else if (myURL.pathname == '/login'){
    //-- Comprobamos si hay cookie de ese usuario
    if(user){
      //-- No le mandamos el formulario
      //-- Le decimos que ya esta logeado
      console.log('Hay cookie guardada, ya estas logeado');
      content = LOGIN.replace("USUARIO", user );

    }else{
      console.log('No hay cookie, hay que logearse');
      //-- Le mandamos el formulario para que se registre
      content = FORMULARIO;
    }
    ext = "html";
  //-- Acceder al recurso procesar
  }else if (myURL.pathname == '/procesar'){
    //-- Comprobamos si el usuario esta registrado en JSON, si es asi OK
    if ((nombre_reg.includes(nombre)) && (password_reg.includes(password))){

      console.log('User: ' + nombre);

      //-- Asignar la cookie del usuario registrado
      res.setHeader('Set-Cookie', "user=" + nombre );

      //-- Mostramos la pagina OK
      console.log('Usuario registrado');
      content = RESPUESTAOK;
      html_extra = nombre;
      content = content.replace("HTML_EXTRA", html_extra);

    }else{
        content = RESPUESTAERROR;
    }
    
  }else if (myURL.pathname == '/comprar'){
    content = COMPRAR.replace('PRODUCTOS', productos_carrito)

    
  }else if (myURL.pathname == '/finalizar'){
    content = RESPUESTACOMP;
  

  //-- Acceder al recurso producto 1
  }else if(myURL.pathname == '/producto1'){
    content = PRODUCTO1;
    //-- Obtengo las descripciones y precios de cada producto
    for (i=0; i<6; i++){
      content = content.replace('DESCRIPCION' + (i+1), descripcion["Bufanda"][i])
      content = content.replace('PRECIO' + (i+1), precio["Bufanda"][i])
    }

  //-- Acceder al recurso producto 2
  }else if(myURL.pathname == '/producto2'){
    content = PRODUCTO2;
    //-- Obtengo las descripciones y precios de cada producto
    for (i=0; i<6; i++){
      content = content.replace('DESCRIPCION' + (i+1), descripcion["Gorro"][i])
      content = content.replace('PRECIO' + (i+1), precio["Gorro"][i])
    }
  //-- Acceder al recurso producto 3
  }else if(myURL.pathname == '/producto3'){
    content = PRODUCTO3;
    //-- Obtengo las descripciones y precios de cada producto
    for (i=0; i<6; i++){
      content = content.replace('DESCRIPCION' + (i+1), descripcion["Monedero"][i])
      content = content.replace('PRECIO' + (i+1), precio["Monedero"][i])
    }
  
  //-- Acceder al recurso producto 4  
  }else if(myURL.pathname == '/producto4'){
    content = PRODUCTO4;
    //-- Obtengo las descripciones y precios de cada producto
    for (i=0; i<6; i++){
      content = content.replace('DESCRIPCION' + (i+1), descripcion["Jersey"][i])
      content = content.replace('PRECIO' + (i+1), precio["Jersey"][i])
    }
   //-- Acceder al recurso producto 5
  }else if(myURL.pathname == '/producto5'){
    content = PRODUCTO5;
    //-- Obtengo las descripciones y precios de cada producto
    for (i=0; i<6; i++){
      content = content.replace('DESCRIPCION' + (i+1), descripcion["Bolso"][i])
      content = content.replace('PRECIO' + (i+1), precio["Bolso"][i])
    }

  //-- Acceder a recurso carrito
  }else if(myURL.pathname == '/producto1/carrito' || myURL.pathname == '/producto2/carrito' ||
           myURL.pathname == '/producto3/carrito' || myURL.pathname == '/producto4/carrito' ||
           myURL.pathname == '/producto5/carrito' ){
    //-- Extraigo el producto
    producto_path = myURL.pathname.split('/')[1];
    //-- Establecer el nombre del producto
    if (producto_path =='producto1'){
      producto = 'Bufanda';
    }else if( producto_path == 'producto2'){
      producto = 'Gorro';
    }else if( producto_path == 'producto3'){
      producto = 'Monedero';
    }else if( producto_path == 'producto4'){
      producto = 'Jersey';
    }else{
      producto = 'Bolso';
    }
    //-- Añado el producto al array de productos
    productos.push(producto);
    //-- Contar la cantidad de cada producto
    let productos_sum = {};
    productos.forEach(function(numero){
      productos_sum[numero] = (productos_sum[numero] || 0) + 1;
    });
  
    //-- Variables para devolver al html
    let total = '';
    let total_cookie = '';
    let list_prod = [];
    //-- Pasar los productos sumados a string
    for (i=0; i<Object.keys(productos_sum).length; i++){
      prod = Object.keys(productos_sum)
      cant = Object.values(productos_sum)
      total += ('<h4>' + prod[i] + ': ' + cant[i] + '</h4>')
      total_cookie += (prod[i] + ': ' + cant[i] + ', ')
      pedido = {"producto": prod[i],
                "unidades": cant[i]}
      list_prod.push(pedido)
    }
    //-- Lista de productos, para el json
    list_productos = list_prod;
    console.log('PEDIDO:')
    console.log(list_productos)
    //-- Lista de productos para mostrar en la compra
    productos_carrito = total;
  
    //-- Asignar la cookie del pedido
    res.setHeader('Set-Cookie', "carrito=" + total_cookie);
    content = CARRO.replace('NINGUNO', total );
    content = content.replace('VOLVER', "<a class='button' href='/" + producto_path + "'>Volver atras</a>");

  //-- Recurso productos
  //-- Ahora vamos a tener en cuenta las busquedas
  }else if(myURL.pathname =='/productos'){
    console.log("Peticion de Productos!")
    content_type = mime_type["json"];

    //-- Leer los parámetros
    let param1 = myURL.searchParams.get('param1');

    //-- Convertimos los caracteres alphanumericos en string
    param1 = param1.toUpperCase();

    console.log("  Param: " +  param1);

    //-- Se construye nuevo Array de resultado de busquedas
    let result = [];

    //-- Para ello
    //-- Recorremos todos los productos de la base de datos
    //-- Y los que cuadren, se añaden al array
    for (let prod of productos_json) {
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

  }else{
    path = myURL.pathname.split('/');
    ext = '';
    if (path.length > 2){
      file = path[path.length-1]
      ext = file.split('.')[1]
      if(path.length == 3){
        if (path[1].startsWith('producto')){
          filename = file
        }else{
          filename = path[1] + '/' + file
        }
       }else{
          filename = path[2] + '/' + file
       }
    }else{
      filename = myURL.pathname.split('/')[1];
      ext = filename.split('.')[1]
    }
    fs.readFile(filename, (err, data) => {
      //-- Controlar si la pagina es no encontrada.
      //-- Devolver pagina de error personalizada, 404 NOT FOUND
      if (err){
        res.writeHead(404, {'Content-Type': content_type});
        res.write(ERROR);
        res.end();
      }else{
        //-- Todo correcto
        //-- Devolvemos segun el tipo de mime
        content_type = mime_type[ext];
        res.setHeader('Content-Type', content_type);
        res.write(data);
        res.end();
      } 
    });
    return;
  }
  
  //-- Generar respuesta
  res.setHeader('Content-Type', content_type);
  res.write(content);
  res.end();
});

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);