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
            timer: 3000,
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

    // Mostrar el precio total en una alerta
    Swal.fire({
        icon: 'info',
        title: 'Total price of your cart is...',
        text: `The total price of your shopping cart is $${total}`
    });
});

// Añadir evento de clic al botón de pago
document.getElementById('payButton').addEventListener('click', function(event) {
    event.preventDefault();

    // Calcular el precio total del carrito
    let total = cart.reduce((sum, product) => sum + product.price, 0);

    // aplicar descuento en caso de que hayan mas de 3 productos
    if (cart.length > 3) {
        total *= 0.9;
    }

    // Mostrar el precio final con descuento si aplica
    Swal.fire({
        icon: 'success',
        title: 'Payment succesful',
        text: `The price after the discount is $${total.toFixed(2)} have a great day`
    });
});
