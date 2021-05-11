//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 8080;

//-- Creamos la variable de numero de usuarios
let num_user = 0;

//-- Creamos el objeto fecha
const tiempo = Date.now();
const fecha = new Date(tiempo);


//-- Establecemos los mensajes a mostrar en el chat
//-- Para el recurso '/help'
let help_msg = ("Los comandos soportados son los siguientes:" +
                "'/help': Mostrar los comandos soportados" +
                "'/list': Mostrar numero de usuarios conectados" +
                "'/hello': El servidor te saluda" +
                "'/date': Mostrar la fecha actual");

//-- Para el recurso '/list'
let list_msg = ("Número de usuarios conectados: " + num_user);

//-- Para el recurso '/hello'
let hello_msg = ("¡HOLA! Gracias por unirte al chat, espero que disfrutes");

//-- Para el recurso '/date'
let date_msg = ("Fecha actual: " + fecha.toUTCString());
                    

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido al chat!!!' + '<p><a href="/index.html">Unirse</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//-- Comprobar los comandos especiales
function check_command(msg){
  if(msg == '/help'){
    console.log('Mostrar Comandos soportados');
  }else if(msg == '/list'){
    console.log('Numero de usuarios conectados');
  }else if(msg == '/hello'){
    console.log('Servidor  devuelve el saludo');
  }else if(msg == '/date'){
    console.log('Mostrar la fecha');
  }else{
    console.log('Comando no reconocido');
  };
};

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);

    //-- Comprobar si el mensaje es un recurso
    if(msg.startsWith('/')){
      console.log(msg.red);
      socket.send(msg);
      //-- Comprobamos el recurso solicitado
      check_command(msg);
    }else{
      //-- Reenviarlo a todos los clientes conectados
      io.send(msg);
    }
    
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);