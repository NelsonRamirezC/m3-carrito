const carrito = {
    productos: [],
    delivery: 3_990,
    descuentos: 0,
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
            let productosEliminados = this.productos.splice(indiceElemento, 1);
            return productosEliminados;
        } else {
            return false;
        }
    },
    cantidadProductos: function () {
        return this.productos.length;
    },
    limpiarCarrito: function () {
        if (this.productos.length == 0) {
            return alert("Carrito vació.");
        }
            this.productos.length = 0;
            return alert("Carrito en cero!");
    },
    productosConDetalle: function(){

        const listaProductosConDetalle = [];
        this.productos.forEach(producto => {
            let productoBuscadoBD = listaProductosBD.find(productoDB => productoDB.id == producto.id);
            productoBuscadoBD.cantidad = producto.cantidad;

            listaProductosConDetalle.push(productoBuscadoBD);
        });

        return listaProductosConDetalle;

    },
    subtotal: function(){
        let productos = this.productosConDetalle();

        let subtotal = 0;

        productos.forEach(producto => {
            subtotal+= producto.precio * producto.cantidad;
        })

        return subtotal;
    },

    totalConImpuestos: function(){
        let total = this.subtotal() + this.totalDelivery();
        return total;
    },
    totalDelivery: function(){
        if(this.productos.length > 0){
            return this.delivery
        }else{
            return 0;
        }
    }
};



function eliminarProducto(id, nombre){
        let productosEliminados = carrito.eliminarProducto(id);
        console.log(productosEliminados);
        let producto = productosEliminados[0];
        if(producto){
            alert(`Producto con ID: ${producto.id} (${nombre}) eliminado correctamente.`);
            main();
        }else{
            alert("Este producto ya no se encuentra en su carrito.");
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
                                                    <div>
                                                        <input type="number" min="1" max="10" step="1" value="${producto.cantidad}">

                                                    </div>
                                                    <div style="width: 80px;">
                                                        <h5 class="mb-0">$${producto.precio}</h5>
                                                    </div>
                                                    <button type="button" class="btn btn-secondary" onclick="eliminarProducto(${producto.id}, '${producto.nombre}')">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `
        });
        

        document.getElementById("contenedor-detalle-productos").innerHTML = tarjetas;
    }

    function cargarDetalleCobro(carrito){

        document.getElementById("costo-envio").innerText = carrito.totalDelivery().toLocaleString("es-CL");
        document.getElementById("subtotal").innerText = carrito.subtotal().toLocaleString("es-CL");
        document.getElementById("total-con-impuestos").innerText = carrito.totalConImpuestos().toLocaleString("es-CL");
        document.getElementById("btn-pago").innerText = carrito.totalConImpuestos().toLocaleString("es-CL");
    }


    document.getElementById("btn-vaciar-carro").addEventListener("click", (event)=> {
        
        let confirmacion = confirm("¿Está seguro que desea eliminar todos los productos del carrito?");

        if(confirmacion){
            carrito.limpiarCarrito();
            main();
        }
    });



    window.main = () => {

        let productos = carrito.productosConDetalle();
        agregarTarjetasProductos(productos);
        cargarDetalleCobro(carrito);
    }
    main();


});