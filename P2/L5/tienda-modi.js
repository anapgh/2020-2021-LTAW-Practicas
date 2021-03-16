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