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
        height: 400,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
      }

    });

    //-- En la parte superior se nos ha creado el menu por defecto
    //-- Si lo queremos quitar, hay que añadir esta línea
    //win.setMenuBarVisibility(false);

    //-- Cargar contenido web en la ventana
    //-- Con loadURL cargamos pagina externa
    //-- La ventana es en realidad.... ¡un navegador!
    //win.loadURL('https://www.urjc.es/etsit');

    //-- Cargar interfaz gráfica en HTML
    //-- Al ser local, usamos loadFile
    win.loadFile("index.html");

    //-- Esperar a que la página se cargue  con el evento 'ready-to-show'
    //-- se muestre y luego enviar el mensaje al proceso de renderizado
    //-- para que lo saque por la interfaz gráfica
    win.on('ready-to-show', () => {
        console.log("HOLA?");
        //-- send(nombre evento, mensaje)
        win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");
    });

});

//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola
//-- render--> main
//-- Se usa el metodo ipcMain.handle(), escuchando el evento
electron.ipcMain.handle('test', (event, msg) => {
    console.log("-> Mensaje: " + msg);
});

