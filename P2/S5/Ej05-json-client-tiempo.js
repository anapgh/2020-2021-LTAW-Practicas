//-- Importo modulo HTTP
const https = require('https');

//-- Recurso deseado --> URL
//-- en este caso el tiempo en madrid
const ENDPOINT = "https://www.metaweather.com/api/location/766273/";

//-- Respuesta de la url
let request = https.get(ENDPOINT, (res) => { 
    //-- Comprobamos si la respuesta es correcta
    //-- Si lo es devuelve el 200 OK
    if (res.statusCode !== 200 ) {
        console.error("Error");
        console.log("Código de respuesta: " + res.statusCode);
        res.resume();
        return;
    }

    //-- Definimos la variable de datos
    let data = '';

    //-- Escuchamos si hay algun evento
    res.on('data', (chunk) => {
        data += chunk;
    });

    //-- Cuando haya escuhado
    res.on('close', () => {
        console.log('Datos recibidos');

        //-- Obtener la variable con la informacion
        //-- Me ha venido una cadena JSON en los datos
        //-- Por lo que con parse lo tranformo
        let tiempo = JSON.parse(data);

        //-- Y aqui decimos que en esa posicion vamos a encontrar la variable tiempo
        let temp = tiempo.consolidated_weather[0].the_temp;

        //-- Mensajes para la consola
        console.log("Lugar: " + tiempo.title);
        console.log("Temperatura: " + temp);
        console.log("Hora: " + tiempo.time);
        
    });
   
});