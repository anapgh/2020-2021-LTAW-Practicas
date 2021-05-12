//-- Cargar el módulo de electron
const electron = require('electron');

//-- El control lo tiene electron
console.log("Arrancando electron...");

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
//-- El evento ready nos indica cuando los modulos de electron estan cargados
//-- y asi ejecutar el proceso principal
electron.app.on('ready', ()=>{
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    //-- Se hace con el metodo BrowserWindow y se le pasa el objeto
    //-- donde se definen las propiedades de ventana
    //-- le pasamos los atributos altura y anchura
    win = new electron.BrowserWindow({
        width: 600,  //-- Anchura 
        height: 400  //-- Altura
    });

    //-- En la parte superior se nos ha creado el menu por defecto
    //-- Si lo queremos quitar, hay que añadir esta línea
    win.setMenuBarVisibility(false);

});

