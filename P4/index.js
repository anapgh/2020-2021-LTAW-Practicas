//-- Es el proceso de renderizado

const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const v_node = document.getElementById("info1");
const v_chrome = document.getElementById("info2");
const v_electron = document.getElementById("info3");
const num_usuarios = document.getElementById("info4");
const dir_ip = document.getElementById("info5");


//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('informacion', (event, message) => {
    console.log("Recibido: " + message);

    //-- Extraemos cada dato
    v_node.textContent = message[0];
    v_chrome.textContent = message[1];
    v_electron.textContent = message[2];
    num_usuarios.textContent = message[3];
    dir_ip.textContent = ("http://" + message[4] + ":" + message[5] + "/" + message[6]);
});

