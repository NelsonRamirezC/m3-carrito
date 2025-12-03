let producto1  = {
    id:1,
    precio: 4_500,
    nombre: "Producto 1"
};
let producto2  = {
    id:2,
    precio:15_000,
    nombre: "Producto 2"
};
let producto3  = {
    id:3,
    precio: 50_000,
    nombre: "Producto 3"
};

const elementosCarrito = [producto1, producto2, producto3];

let idBuscado = 4;
let indiceElemento = elementosCarrito.findIndex(producto => producto.id == idBuscado);

console.log(indiceElemento);
