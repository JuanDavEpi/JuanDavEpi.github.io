// Borrar el carrito del localStorage al cargar la página de nuevo o por si ocurre algo 
localStorage.removeItem('cart');

// Obtener el carrito del localStorage 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito en localStorage
function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Función para actualizar el número 
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Inicializar el contador en la página
updateCartCount();



// Seleccionar todos los botones con la clase 'product-button'
const buttons = document.querySelectorAll('.product-button');

// Añadir evento de clic a cada botón
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        // Obtener datos del producto desde data-(someting)
        const product = {
            id: this.dataset.productId,
            name: this.dataset.productName,
            price: parseFloat(this.dataset.productPrice)
        };

        // Añadir el producto al carrito
        cart.push(product);

        // Actualizar el carrito 
        updateCartStorage();

        // Mostrar la alert
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({
            icon: "success",
            title: "Product added successfully"
        });

        console.log("Product was added successfully", product);
    });
});

// Añadir evento 
document.getElementById('openCart').addEventListener('click', function(event) {
    event.preventDefault();

    // calcular precio
    const total = cart.reduce((sum, product) => sum + product.price, 0).toFixed(2);

    // Mostrar el precio total en una alert
    Swal.fire({
        icon: 'info',
        title: 'Total price of your cart is...',
        text: `The total price of your shopping cart is $${total}`
    });
});

document.getElementById('payButton').addEventListener('click', function(event) {
    event.preventDefault();

    // Calcular el precio 
    let total = cart.reduce((sum, product) => sum + product.price, 0);

    // aplicar descuento en caso de que hayan mas de 3, o 5 productos
    if (cart.length >= 3) {
        total *= 0.9;
    }

    if(cart.lentgh >= 5) {
        total *= 0.6;
    }

    // mostrar el precio final con descuento si aplica
    Swal.fire({
        icon: 'success',
        title: 'Payment succesful',
        text: `The price after the discount is $${total.toFixed(2)}`
    });
});

// Selecciona los elementos
const productButtons = document.querySelectorAll('.product-button');
const modal_cont = document.getElementById('modal_cont');
const open = document.getElementById('open');
const close = document.getElementById('close');
const productList = document.querySelector('.bill ul');

// Objeto para almacenar los productos agregados al carrito con sus cantidades
let car = {};

// Función para agregar un producto al carrito
productButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        // Obtén la información del producto desde los atributos data
        const productId = button.getAttribute('data-product-id');
        const productName = button.getAttribute('data-product-name');
        const productPrice = button.getAttribute('data-product-price');

        // Si el producto ya está en el carrito, aumenta su cantidad
        if (car[productId]) {
            car[productId].quantity += 1;
        } else {
            // Si el producto no está en el carrito, agrégalo con cantidad 1
            car[productId] = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
        }

        // Actualiza la lista de productos en el modal
        updateProductList();
    });
});

// Función para actualizar la lista de productos en el modal
function updateProductList() {
    productList.innerHTML = ''; // Limpia la lista actual

    for (const productId in car) {
        const product = car[productId];
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price} x ${product.quantity}`;
        productList.appendChild(li);
    }
}

// Muestra el modal cuando se hace clic en "View Products"
open.addEventListener('click', () => {
    modal_cont.classList.add('show');
});

// Cierra el modal cuando se hace clic en "Close"
close.addEventListener('click', () => {
    modal_cont.classList.remove('show');
});
