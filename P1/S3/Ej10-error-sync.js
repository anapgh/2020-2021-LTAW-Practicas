//-- GESTION DE ERRORES SINCRONA: TRY-CATCH
const fs = require('fs');

//-- Fichero a leer
const FICHERO = 'fich11.txt';

try {
  const data = fs.readFileSync(FICHERO, 'utf8');
  console.log("Lectura completada...")
  console.log("Contenido del fichero: \n")
  console.log(data);

//-- Si al ejecutarlo se produce un error nos devuelve este mensaje
//-- No existe ese fichero!!!
} catch (err) {
  console.log("Error!!")
  console.log(err.message);
}