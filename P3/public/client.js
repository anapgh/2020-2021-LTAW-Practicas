//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");

//-- Variable que muestra si se escribe
let user_write = false;
//-- Mensaje de estar escribiendo
const write_msg = ('Un usuario esta escribiendo...');

//-- Cargar sonido
let silbido = new Audio('silbido.mp3');

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Evento message
socket.on("message", (msg)=>{
  display.innerHTML += '<p style="color:blue">' + msg + '</p>';
  if(msg != write_msg){
    //-- Sonar cuando el mensaje sea distinto a estar escribiendo
    silbido.play();
  }
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  //-- Si hay valor en la caja, enviar el valor
  if (msg_entry.value)
    socket.send(msg_entry.value);
    user_write = false;
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}

//-- Al estar escribiendo se les manda un mensaje a los usuarios
msg_entry.oninput = () => {
  //-- Si esta escribiendo
  if(!user_write){
    user_writing = true;
    socket.send(write_msg);
  }
}