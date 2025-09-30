// Punto 1
//Simulo la tienda con un array de objetos con el id, nombre, precio y la imagen con su ruta.
const frutasTienda = [

    {id:1, nombre:"Anana", precio:3000, ruta_img:"img/anana.jpg", cantidad:0},
    {id:2, nombre:"Arandano", precio:5000, ruta_img:"img/arandano.jpg", cantidad:0},
    {id:3, nombre:"Banana", precio:1000, ruta_img:"img/banana.jpg", cantidad:0},
    {id:4, nombre:"Frambuesa", precio:4000, ruta_img:"img/frambuesa.png", cantidad:0},
    {id:5, nombre:"Frutilla", precio:3000, ruta_img:"img/frutilla.jpg", cantidad:0},
    {id:6, nombre:"Kiwi", precio:2000, ruta_img:"img/kiwi.jpg", cantidad:0},
    {id:7, nombre:"Mandarina", precio:800, ruta_img:"img/mandarina.jpg", cantidad:0},
    {id:8, nombre:"Manzana", precio:1500, ruta_img:"img/manzana.jpg", cantidad:0},
    {id:9, nombre:"Naranja", precio:9000, ruta_img:"img/naranja.jpg", cantidad:0},
    {id:10, nombre:"Pera", precio:2500, ruta_img:"img/pera.jpg", cantidad:0},
    {id:11, nombre:"Pomelo Amarillo", precio:2000, ruta_img:"img/pomelo-amarillo.jpg", cantidad:0},
    {id:12, nombre:"Pomelo Rojo", precio:2000, ruta_img:"img/pomelo-rojo.jpg", cantidad:0},
    {id:13, nombre:"Sandia", precio:5000, ruta_img:"img/sandia.jpg", cantidad:0},

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
const contadorCarrito = document.getElementById("contador-carrito");
const totalCarrito = document.getElementById("total-carrito");



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
      <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
    </div>
    `
  });
  contenedorProductos.innerHTML = htmlProductos;

}




// PUNTO 4
// FILTRO DE PRODUCTOS
// Funcion de filtro: al escribir en la barra de búsqueda
// se muestran solo las frutas cuyo nombre incluya el texto ingresado.


barraBusqueda.addEventListener("input", filtrarProducto);

// Problema al buscar anana , tambien busca banana
function filtrarProducto() {

    let valor = barraBusqueda.value.toLowerCase();
    // Filtramos el array de frutas con filter y includes.
    let filtrados = frutasTienda.filter(fruta => fruta.nombre.toLowerCase().includes(valor));
    mostrarLista(filtrados);
}


// PUNTO 5
// Agrega una fruta al carrito.
// Si ya está en el carrito, se aumenta la cantidad.
// Si no está, se pone con la de cantidad = 1.


function agregarACarrito(idFruta){

  // busca la fruta en la tienda
  let fruta = frutasTienda.find(fruta => fruta.id == idFruta);

  // Esto va para el contador
  let enCarrito = carrito.find(fruta => fruta.id == idFruta);


  // Si devuelve el objeto entero entonces incrementa si no hace el push
  if (enCarrito !== undefined) {
    enCarrito.cantidad++;
  } else {
      carrito.push({...fruta, cantidad:1});
  }

  mostrarCarrito();

  // Guardar estos cambios en el local storage
  actualizarCarrito();

}

function mostrarCarrito(){
  let html = "<ul>";
  carrito.forEach((fruta, index) => {
    html += `
    <li class="bloque-item">
      <p class="nombre-item">${fruta.nombre} - ${fruta.precio} x ${fruta.cantidad}</p>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    </li>`;
  });
  html += `</ul>
  <button onclick="vaciarCarrito()">Vaciar carrito</button>`;

  contenedorCarrito.innerHTML = html;
  actualizarContadorYTotal();
}


function eliminarProducto(index){

  carrito.splice(index, 1);
  mostrarCarrito();
  actualizarCarrito()
}


// PUNTO 6 CON EL LOCAL STORAGE
// Guardar carrito en localStorage y volver a cargarlo si ya existía.

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    let data = localStorage.getItem("carrito");
    if (data) {
        carrito = JSON.parse(data);
        mostrarCarrito();
    }
}


// PUNTO 7 
//// Calcula cuántos productos hay en total y cuanta plata suman entre ellos.


function actualizarContadorYTotal() {

    let totalProductos = 0;
    let totalPrecio = 0;

    // voy acumnulando la cantidad de productos y el precio total haciendo la cuenta de precio * cantidad
    carrito.forEach(fruta => {
        totalProductos += fruta.cantidad;
        totalPrecio += fruta.precio * fruta.cantidad;
    });

    contadorCarrito.innerText = `Carrito: ${totalProductos} productos`;
    totalCarrito.innerText = `Total: $${totalPrecio}`;
}



// PUNTO 8 ORDENAR 
// Botones que permiten ordenar los productos:
// uno por nombre y el otro de menor a mayor por precio.


botonOrdenarNombre.addEventListener("click", () => {
    let ordenados = [...frutasTienda].sort((a,b) => a.nombre.localeCompare(b.nombre));
    mostrarLista(ordenados);
});

botonOrdenarPrecio.addEventListener("click", () => {
    let ordenados = [...frutasTienda].sort((a,b) => a.precio - b.precio);
    mostrarLista(ordenados);
});




// PUNTO 9 VACIAR EL CARRITO
// Vacía todo el carrito y actualiza en pantalla y en local storage.

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    actualizarCarrito();
}





function init() {
    imprimirDatosAlumno();
    mostrarLista(frutasTienda);
    cargarCarrito();
}
init();
