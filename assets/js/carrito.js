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
        let total = this.subtotal() + this.totalDelivery() - this.descuentos;
        return total;
    },
    totalDelivery: function(){
        if(this.productos.length > 0){
            return this.delivery
        }else{
            return 0;
        }
    },
    ingresoCupon(cupon){
        let cuponesValidos = ["PROMO10", "ENVIOGRATIS"];

        if(cuponesValidos.includes(cupon)){
            // SIGO CON LA APLICACIÓN DEL DESCUENTO
            

            if(cupon == "PROMO10"){

                let subtotal = this.subtotal();
                this.descuentos  = subtotal* 0.1;

                if(subtotal >= 30000){
                    this.descuentos  = subtotal* 0.1;
                }

                return true;

            }else if(cupon == "ENVIOGRATIS"){

                if(this.subtotal() >= 25000){
                    this.delivery = 0;
                }
                
                return true;

            }else {
                return false;
            }

        }else {
            return false;
        }

    }
};