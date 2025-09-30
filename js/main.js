// Punto 1
//Simulo la tienda con un array de objetos con el id, nombre, precio y la imagen con su ruta.
const frutasTienda = [

    {id:1, nombre:"Anana", precio:100, ruta_img:"img/anana.jpg", cantidad:0},
    {id:2, nombre:"Arandano", precio:80, ruta_img:"img/arandano.jpg", cantidad:0},
    {id:3, nombre:"Banana", precio:120, ruta_img:"img/banana.jpg", cantidad:0},
    {id:4, nombre:"Frambuesa", precio:90, ruta_img:"img/frambuesa.png", cantidad:0},
    {id:5, nombre:"Frutilla", precio:300, ruta_img:"img/frutilla.jpg", cantidad:0},
    {id:6, nombre:"Kiwi", precio:250, ruta_img:"img/kiwi.jpg", cantidad:0},
    {id:7, nombre:"Mandarina", precio:200, ruta_img:"img/mandarina.jpg", cantidad:0},
    {id:8, nombre:"Manzana", precio:400, ruta_img:"img/manzana.jpg", cantidad:0},
    {id:9, nombre:"Naranja", precio:150, ruta_img:"img/naranja.jpg", cantidad:0},
    {id:10, nombre:"Pera", precio:170, ruta_img:"img/pera.jpg", cantidad:0},
    {id:11, nombre:"Pomelo Amarillo", precio:220, ruta_img:"img/pomelo-amarillo.jpg", cantidad:0},
    {id:12, nombre:"Pomelo Rojo", precio:70, ruta_img:"img/pomelo-rojo.jpg", cantidad:0},
    {id:13, nombre:"Sandia", precio:110, ruta_img:"img/sandia.jpg", cantidad:0},

];


//PUNTO 2
// Función para mostrar mis datos (nombre, apellido, dni).
// Se imprime en la consola y en el <nav> del HTML.

const alumno = {dni: "43448009", nombre: "Nahuel", apellido: "Melian"};

function imprimirDatosAlumno() {
    console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);
    document.getElementById("datos-alumno").innerText = `${alumno.nombre} ${alumno.apellido}`;
}


//VARIABLES DEL DOM
// Variables que conectan con los elementos del DOM 
// Como ejemplo la barra de busqueda, los contenedores, los botones de ordenamientos , etc


let carrito = [];

const barraBusqueda = document.getElementById("barra-busqueda");

// contenedores
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");


// Ver despues los de contador

//Botones del ordenamiento
const botonOrdenarNombre = document.getElementById("ordenar-nombre");
const botonOrdenarPrecio = document.getElementById("ordenar-precio");


//PUNTO 3
// Es una funcion que va a recorrer un array de frutas y genera cards de html.
// Cada card tiene su imagen, nombre, precio y  un boton para agregar al carrito.
// los datos estan en el arrays de objetos de la frutasTienda


function mostrarLista(array){

  let htmlProductos = "";
  array.forEach(fruta => {
    htmlProductos += `
    <div class="card-producto">
      <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
      <h3>${fruta.nombre}</h3>
      <p>$${fruta.precio}</p>
      <button>Agregar al carrito</button>
    </div>
    `
  });
  contenedorProductos.innerHTML = htmlProductos;

}


function init(){
  imprimirDatosAlumno();
  mostrarLista(frutasTienda)
}

init();