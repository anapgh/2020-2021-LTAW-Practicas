//-- Cargar el módulo de electron
const electron = require('electron');

//-- El control lo tiene electron
console.log("Arrancando electron...");

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
//-- El evento ready nos indica cuando los modulos de electron estan cargados
//-- y asi ejecutar el proceso principal
electron.app.on('ready', ()=>{
    console.log("Evento Ready!")
});