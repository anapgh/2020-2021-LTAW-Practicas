//-- Imprimir información sobre la solicitud recibida

const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('form-user.html','utf-8');

//-- Pagina principal
const MAIN = fs.readFileSync('main.html', 'utf-8');

//-- Pagina del producto 1
const PRODUCTO1 = fs.readFileSync('product1.html', 'utf-8');

//-- Pagina del producto 2
const PRODUCTO2 = fs.readFileSync('product2.html', 'utf-8');

//-- Pagina del producto 3
const PRODUCTO3 = fs.readFileSync('product3.html', 'utf-8');

//-- Pagina del producto 4
const PRODUCTO4 = fs.readFileSync('product4.html', 'utf-8');

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
let apellidos_reg = [];

//-- Imprimir usuarios  registrados
//-- Recorrer el json para buscar los clientes registrados
let usuarios_reg = tienda[1]["usuarios"];
for (i = 0; i < usuarios_reg.length; i++){
    nombre_reg.push(usuarios_reg[i]["nombre"]);
    apellidos_reg.push(usuarios_reg[i]["apellidos"]);
};

//-- Array de productos
let productos = [];
let list_productos;


//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  //-- Leer la Cookie recibida y mostrarla en la consola
  const cookie = req.headers.cookie;

  //-- Variable para guardar el usuario
  let user;

  //-- Variable para guardar el carrito
  let carrito;

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

    //--- Si la variable user está asignada
    if (user) {
      //-- Añadir a la página el nombre del usuario
      console.log("user: " + user);
      console.log('HAY USER COOKIE');
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

  //-- Leer los parámetros
  let direccion = myURL.searchParams.get('direccion');
  let tarjeta = myURL.searchParams.get('tarjeta');
  console.log(" Direccion de envio: " + direccion);
  console.log(" Numero de Tarjeta de credito: " + tarjeta);

  //-- Comprobamos si es distinto de null
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

  //-- Por defecto entregar la pagina principal
  let content_type = "text/html"; //-- le digo de que tipo es
  let content; //-- contenido

  //-- Comprobar si hay cookie de ese usuario
  if(user){
    //-- Introducir su nombre en la pagina principal
    content = MAIN.replace('<a href="/login">[Login]</a>', '<h3>' + user + '</h3>');
  }else{
    //-- Pagina principal con el login
    content = MAIN; 
  }

  //-- Acceder al recurso login
  if (myURL.pathname == '/login'){
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
  //-- Acceder al recurso procesar
  }else if (myURL.pathname == '/procesar'){
    //-- Comprobamos si el usuario esta registrado en JSON, si es asi OK
    if ((nombre_reg.includes(nombre)) && (apellidos_reg.includes(apellidos))){

      //-- LOcalizamos el indice donde se encuentra el usuario
      let index = nombre_reg.indexOf(nombre);

      //-- Extraemos el nombre de usuario
      usuario = usuarios_reg[index]["usuario"];
      console.log('User: ' + usuario);

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
  }else if (myURL.pathname == '/comprar'){
    content = COMPRAR 
    
  }else if (myURL.pathname == '/finalizar'){
    content = RESPUESTACOMP;

  //-- Acceder al recurso producto 1
  }else if(myURL.pathname == '/producto1'){
    content = PRODUCTO1;

  //-- Acceder al recurso producto 2
  }else if(myURL.pathname == '/producto2'){
    content = PRODUCTO2;

  //-- Acceder al recurso producto 3
  }else if(myURL.pathname == '/producto3'){
    content = PRODUCTO3;
  
  //-- Acceder al recurso producto 4  
  }else if(myURL.pathname == '/producto4'){
    content = PRODUCTO4;

  //-- Acceder a recurso carrito
  }else if(myURL.pathname == '/producto1/carrito' || myURL.pathname == '/producto2/carrito' ||
           myURL.pathname == '/producto3/carrito' || myURL.pathname == '/producto4/carrito'){
    //-- Extraigo el producto
    producto = myURL.pathname.split('/')[1];
    //-- Añado el producto al array de productos
    productos.push(producto);
    //-- Contar la cantidad de cada producto
    var productos_sum = {};
    productos.forEach(function(numero){
      productos_sum[numero] = (productos_sum[numero] || 0) + 1;
    });
  
    //-- Variables para devolver al html
    var total = '';
    var total_cookie = '';
    let list_prod = [];
    //-- Pasar los productos sumados a string
    for (i=0; i<Object.keys(productos_sum).length; i++){
      prod = Object.keys(productos_sum)
      cant = Object.values(productos_sum)
      total += ('<h3>' + prod[i] + ': ' + cant[i] + '</h4>')
      total_cookie += (prod[i] + ': ' + cant[i] + ', ')
      pedido = {"producto": prod[i],
                 "unidades": cant[i]}
      list_prod.push(pedido)
    }
    //-- Lista de productos, para el json
    list_productos = list_prod;
    console.log('PEDIDO:')
    console.log(list_productos)
  
    //-- Asignar la cookie del pedido
    res.setHeader('Set-Cookie', "carrito=" + total_cookie);
    content = CARRO.replace('NINGUNO', total );
    content = content.replace('VOLVER', '<a href="/' + producto + '">[Volver atras]</a>')
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
    res.end();
  });

});

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);