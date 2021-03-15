//-- Crear una variable con la estructura definida
//-- en un fichero JSON

//-- Importamos el modulo fichero, fs
const fs = require('fs');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "Ej-03-tienda-json-fich.json"

//-- Leer el fichero JSON
//-- de esta forma lo hacemos sincrona
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
//-- nos devuelve la estructura del json
const tienda = JSON.parse(tienda_json);

//-- Mostrar informacion sobre la tienda
console.log("Productos en la tienda: " + tienda.length);

//-- Recorrer el array de productos
tienda.forEach((element, index)=>{
  console.log("Producto: " + (index + 1) + ": " + element["nombre"]);