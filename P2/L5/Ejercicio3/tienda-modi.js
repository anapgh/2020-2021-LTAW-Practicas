//-- Ejercicio 3: Modificación del fichero tienda.json

//-- Leer el fichero tienda.json
//-- Incrementar el stock de todos los productos en 1 unidad
//-- Guardar el resultado en el fichero tienda.json.
//----------------------------------------------------------------------
//-- Cargamos el modulo fs para manipular ficheros
const fs = require('fs');

//-- Nombre del fichero JSON a leer (entrada)
const FICHERO_JSON = "tienda.json";

//-- Nombre del fichero JSON de salida
const FICHERO_JSON_OUT = "tienda-modi.json";

//-- Leer el fichero JSON
//-- Lo hacemos de forma sincrona
const tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Imprimir contenido
console.log("contenido del fichero")
console.log(tienda)

//-- Incrementamos el numero de todos los productos en 1
//-- Cambiamos los productos (indice 0)
productos = tienda[0]["productos"] //-- Nos quedamos con los productos
console.log("productos de la tienda");
console.log(productos);

//-- Defino numero de productos
const N = 4;
//-- Me quedo con cada stock de cada producto (indice 3)
//-- y se lo incrementamos en 1
for(i = 0; i <N; i++){
    productos[i]["stock"] += 1;
}

console.log("productos incrementados");
console.log(productos);

//-- Convertir la variable a cadena JSON
//-- Convertimos una cadena a JSON con la funcion .stringify
let myJSON = JSON.stringify(tienda, null, 4);

//-- Guardarla en el fichero destino
fs.writeFileSync(FICHERO_JSON_OUT, myJSON);

console.log("Información guardada en el fichero: " + FICHERO_JSON_OUT);

