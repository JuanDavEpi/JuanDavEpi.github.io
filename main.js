const bebidas = [
    {id: 1, nombre: "Margaritas", precio: 2500},
    {id: 2, nombre: "Pepsi", precio: 3000},
    {id: 3, nombre: "Coca Cola", precio: 3000},
]; // catálogo inicial

class Productos {
    constructor(productos) {
        this.items = productos;
    }

    addProduct(nombreB, precioP) {
        const product = {id: this.generarId(), nombre: nombreB, precio: precioP};
        this.items.push(product);
        console.log("Product added");
    }

    buscarProductos(id) {
        return this.items.find(item => item.id == id);
    }

    obtenerProductos() {
        return this.items;
    }

    totalProductos() {
        return this.items.length;
    }

    generarId() {
        let max = 0;
        this.items.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });
        return max + 1;
    }

    eliminarProducto(id) {
        const productoEliminado = this.items.find(item => item.id === id);
        if (productoEliminado) {
            this.items = this.items.filter(item => item.id !== id);
            alert("The product " + productoEliminado.nombre + " was eliminated");
        } else {
            alert("Product with ID " + id + " not found");
        }
    }

    mostrarProductos() {
        let productosTexto = this.items.map(item => `ID: ${item.id}, Nombre: ${item.nombre}, Precio: $${item.precio}`).join('\n');
        alert("Productos disponibles:\n" + productosTexto);
    }
}

const catalogo = new Productos(bebidas);

// Agregar productos
let nombreProducto = prompt("Ingresa el nombre del producto para agregarlo a la lista");
let precioProducto = parseFloat(prompt("Ingresa el precio"));
catalogo.addProduct(nombreProducto, precioProducto);
catalogo.addProduct("Cheetos", 2000);
catalogo.addProduct("DeTodito", 4000);
catalogo.addProduct("Tic Tac", 4000);

// Mostrar productos disponibles
catalogo.mostrarProductos();

// Eliminar producto a través de prompt
let idProductoEliminar = parseInt(prompt("Ingresa el ID del producto para eliminarlo"));
catalogo.eliminarProducto(idProductoEliminar);
catalogo.mostrarProductos();

// Buscar producto a través de prompt
let idProductoBuscar = parseInt(prompt("Ingresa el ID del producto para buscarlo"));
let producto = catalogo.buscarProductos(idProductoBuscar);
if (producto) {
    alert(producto.nombre + " $" + producto.precio);
} else {
    alert("Product not found");
}
