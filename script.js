// Virtual database
const products = [
    { id: 1, name: 'Iphone 15', price: 10,},
    { id: 2, name: 'Product 2', price: 15 },
];

let cart = [];
let users = [];

// Function to add products to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        displayCartItems();
    }
}

// Function to update cart count in the navigation bar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}

// Function to show the sign-up form
function showSignUpForm() {
    document.getElementById('signup-form').style.display = 'block';
}

// Function to show the login form
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
}

// Function to show the cart
function showCart() {
    document.getElementById('cart').style.display = 'block';
    displayCartItems();
}

// Function to close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Function to display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Remove</button>
            <button onclick="updateCartItem(${item.id}, 'increase')">+</button>
            <button onclick="updateCartItem(${item.id}, 'decrease')">-</button>
        `;
        cartItems.appendChild(div);
    });
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCartItems();
}

// Function to update cart item quantity
function updateCartItem(productId, action) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (action === 'increase') {
            cartItem.quantity += 1;
        } else if (action === 'decrease' && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        }
        displayCartItems();
    }
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCartCount();
    displayCartItems();
}

// Handle sign-up form submission
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        users.push({ username, password });
        alert('Sign up successful!');
        closeModal('signup-form');
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Login successful!');
        closeModal('login-form');
    } else {
        alert('Invalid username or password.');
    }
});
