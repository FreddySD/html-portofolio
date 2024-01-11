let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productElement = event.target.closest('.product');
        const product = {
            id: productElement.dataset.id,
            name: productElement.dataset.name,
            price: parseFloat(productElement.dataset.price),
            quantity: 1
        };
        addToCart(product);
        updateCartDisplay();
    });
});

function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        } else {
            cart.splice(productIndex, 1);
        }
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Initial cart update
updateCartDisplay();
// ... (rest of the existing code)

function clearCart() {
    cart = []; // Clear the cart array
    updateCartDisplay(); // Update the display to show an empty cart
}

// Add the checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    clearCart(); // Call the clearCart function
    alert('Checkout complete! Thank you for your purchase.'); // Provide feedback
});

// ... (rest of the existing code)
