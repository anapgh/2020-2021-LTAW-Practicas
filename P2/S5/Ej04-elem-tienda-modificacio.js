//-- Lectura y modificación de un fichero JSON
const fs = require('fs');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "Ej03-elem-tienda-json-fich.json"

//-- Nombre del fichero JSON de salida
const FICHERO_JSON_OUT = "Ej04-elem-tienda-modificacion.json"

//-- Leer el fichero JSON
//-- De forma sincrona
const tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Modificar el nombre del producto 2
//-- Cambiamos el producto 2 (indice 1) el nombre a otro
tienda[1]["nombre"] = "IceBeraker"

//-- Mostrar informacion sobre la tienda
//-- Numero de productos
console.log("Productos en la tienda: " + tienda.length);

//-- Recorrer el array de productos
tienda.forEach((element, index)=>{
  console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
});

//-- Convertir la variable a cadena JSON
//-- Convertimos de una cadena a JSON con la funcion
//-- .stringify
let myJSON = JSON.stringify(tienda);

//-- Guardarla en el fichero destino
//-- guardamos nuestro nuevo fichero JSON
fs.writeFileSync(FICHERO_JSON_OUT, myJSON);

console.log("Información guardada en fichero: " + FICHERO_JSON_OUT);