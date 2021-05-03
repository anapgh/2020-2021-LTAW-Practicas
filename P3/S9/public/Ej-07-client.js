//-- Elementos del interfaz
const button = document.getElementById("button");
const display = document.getElementById("display");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

let contador = 1;

//-- Evento conectado
socket.on("connect", () => {
  //-- Enviar mensaje inicial
  socket.send("Mensaje inicial del Cliente!!!");
});  

//-- Evento desconectado
socket.on("disconnect", ()=> {
  display.innerHTML="¡¡DESCONECTADO!!"
})

//-- Evento message
socket.on("message", (msg)=>{
  display.innerHTML += '<p style="color:blue">' + msg + '</p>';
});

//-- Al apretar el botón se envía un mensaje al servidor
button.onclick = () => {
  socket.send("Holiii-" + contador);
  contador += 1;
}