//-- Cadena con la estructura de la tienda en JSON
//-- Los nombres de las propiedades entre comillas
const tienda_json = `[
  {
    "nombre": "Alhambra II",
    "descripcion": "Placa con FPGA ice40HX8K",
    "stock": 3
  },
  {
    "nombre": "Icestick",
    "stock": 10
  }
]`

//-- Crear la estructura tienda a partir de la cadena en json
//-- la funcion 'parse', me devuelve la estructura (tiene que estar bien formada)
const tienda = JSON.parse(tienda_json);

//-- Mostrar informacion sobre la tienda
//-- Numero de productos --> length
console.log("Productos en la tienda: " + tienda.length);

//-- Recorrer el array de productos
//-- De otra forma lo devolvemos con otra forma
tienda.forEach((element, index)=>{
  console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
});