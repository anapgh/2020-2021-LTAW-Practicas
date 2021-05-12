//-- Es el proceso de renderizado

const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const v_node = document.getElementById("info1");
const v_chrome = document.getElementById("info2");
const v_electron = document.getElementById("info3");
const num_usuarios = document.getElementById("info4");
const dir_ip = document.getElementById("info5");
const mensajes = document.getElementById("display");


//------ Mensajes recibidos del proceso MAIN ------

//-- Información del sistema
electron.ipcRenderer.on('informacion', (event, message) => {
    console.log("Recibido: " + message);

    //-- Extraemos cada dato
    v_node.textContent = message[0];
    v_chrome.textContent = message[1];
    v_electron.textContent = message[2];
    dir_ip.textContent = ("http://" + message[3] + ":" + message[4] + "/" + message[5]);
});

//-- Numero de usuarios
electron.ipcRenderer.on('users', (event, message) => {
    console.log("Recibido: " + message);
    num_usuarios.textContent = message;
});

//-- Mensajes de los clientes
electron.ipcRenderer.on('msg_client', (event, message) => {
    console.log("Recibido: " + message);
    mensajes.innerHTML += message + "<br>";
});
