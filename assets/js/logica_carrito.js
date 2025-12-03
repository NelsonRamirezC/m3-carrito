const carrito = {
    productos: [],
    delivery: 3_990,
    buscarProductos: function(id){
        let productoBuscado = this.productos.find(
            (producto) => producto.id == id
        );

        // SI ENCUENTRA DEVUELVE EL OBJETO, DE LO CONTRARIO DEVUELVE UNDEFINED
        return productoBuscado; 
    },
    actualizarProducto: function(id, cantidad){
        let productoBuscado = this.buscarProductos(id);
        productoBuscado.cantidad = cantidad;

        return productoBuscado;
        
    },
    agregarProducto: function (id, cantidad = 1) {

        let productoBuscado = this.buscarProductos(id);

        if (productoBuscado) {
            let nuevaCantidad = productoBuscado.cantidad + cantidad;

            this.actualizarProducto(id, nuevaCantidad);
        } else {

            let productoBD = listaProductosBD.find(producto=> producto.id == id);

            if(productoBD){
                const detalleProducto = {
                    id: id,
                    cantidad: cantidad,
                };
                this.productos.push(detalleProducto);
            }else{
                return alert("Producto ya no existe en la Base de datos.");
            }
        }
    },
    eliminarProducto: function (id) {
        let indiceElemento = this.productos.findIndex(
            (producto) => producto.id == id
        );

        if (indiceElemento >= 0) {
            console.log("elemento encontrado.");

            this.productos.splice(indiceElemento, 1);
            return this.productos;
        } else {
            console.log("Producto no encontrado en el carrito");
        }
    },
    cantidadProductos: function () {
        return this.productos.length;
    },
    limpiarCarrito: function () {
        if (this.productos.length == 0) {
            return alert("Carrito vació.");
        }

        let confirmacion = confirm(
            "¿Está seguro que desea eliminar todos los productos del carrito?"
        );

        if (confirmacion) {
            this.productos.length = 0;
            return alert("Carrito en cero!");
        }
    },
    productosConDetalle: function(){

        const listaProductosConDetalle = [];
        this.productos.forEach(producto => {
            let productoBuscadoBD = listaProductosBD.find(productoDB => productoDB.id == producto.id);
            productoBuscadoBD.cantidad = producto.cantidad;

            listaProductosConDetalle.push(productoBuscadoBD);
        });

        return listaProductosConDetalle;

    }
};



document.addEventListener("DOMContentLoaded", (event) => { 

    //PRODUCTOS INICIALES DEL CARRITO
    carrito.agregarProducto(1, 2);
    carrito.agregarProducto(2, 1);
    carrito.agregarProducto(3, 5);

    //console.log(carrito.productosConDetalle());


    function agregarTarjetasProductos(listaProductos){

        document.getElementById("cantidad-productos").innerText = listaProductos.length

        let tarjetas = "";

        listaProductos.forEach(producto => {
            tarjetas += `
                <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex flex-row align-items-center">
                                                    <div>
                                                        <img src="${producto.imagen}"
                                                            class="img-fluid rounded-3" alt="Shopping item"
                                                            style="width: 65px;">
                                                    </div>
                                                    <div class="ms-3">
                                                        <h5>${producto.nombre}</h5>
                                                        <p class="small mb-0">${producto.modelo}</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center">
                                                    <div style="width: 50px;">
                                                        <h5 class="fw-normal mb-0">${producto.cantidad}</h5>
                                                    </div>
                                                    <div style="width: 80px;">
                                                        <h5 class="mb-0">$${producto.precio}</h5>
                                                    </div>
                                                    <a href="#!" style="color: #cecece;"><i
                                                            class="fas fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `
        });
        

        document.getElementById("contenedor-detalle-productos").innerHTML = tarjetas;
    }

    function cargarDetalleCobro(carrito){

        document.getElementById("costo-envio").innerText = carrito.delivery;
    }


    function main(){

        let productos = carrito.productosConDetalle();
        agregarTarjetasProductos(productos);
        cargarDetalleCobro(carrito);
    }
    main();


});