// FOOD MANAGEMENT SYSTEM

// 1. Available food items
const foodItems = [
    {
        id: 1,
        name: "Rice and Beans",
        price: 1500
    },
    {
        id: 2,
        name: "Chips and Eggs",
        price: 2000
    },
    {
        id: 3,
        name: "Chicken and Rice",
        price: 3000
    },
    {
        id: 4,
        name: "Beef and Potatoes",
        price: 2500
    },
    {
        id: 5,
        name: "Sambusa",
        price: 500
    },
    {
        id: 6,
        name: "Fresh Juice",
        price: 1000
    }
];

// 2. Shopping cart
let cart = [];

// 3. Get HTML elements
const foodContainer = document.getElementById("food-container");
const cartContainer = document.getElementById("cart-container");
const totalElement = document.getElementById("total");
const checkoutButton = document.getElementById("checkout-btn");

// 4. Display available food items
function displayFoodItems() {

    foodContainer.innerHTML = "";

    foodItems.forEach(food => {

        const foodCard = document.createElement("div");

        foodCard.className = "food-card";

        foodCard.innerHTML = `
            <h3>${food.name}</h3>

            <p>Price: ${food.price.toLocaleString()} RWF</p>

            <button class="add-btn" data-id="${food.id}">
                Add to Cart
            </button>
        `;

        foodContainer.appendChild(foodCard);

    });

}

// 5. Add food to shopping cart
function addToCart(foodId) {

    const food = foodItems.find(item => item.id === foodId);

    if (!food) return;

    const existingItem = cart.find(item => item.id === foodId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }

    displayCart();

}

// 6. Display shopping cart
function displayCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = "<p>Your cart is empty.</p>";

        totalElement.textContent = "0 RWF";

        return;

    }

    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <h3>${item.name}</h3>

            <p>Price: ${item.price.toLocaleString()} RWF</p>

            <p>Quantity: ${item.quantity}</p>

            <p>
                Subtotal:
                ${(item.price * item.quantity).toLocaleString()} RWF
            </p>

            <button class="increase-btn" data-id="${item.id}">
                +
            </button>

            <button class="decrease-btn" data-id="${item.id}">
                -
            </button>

            <button class="remove-btn" data-id="${item.id}">
                Remove
            </button>
        `;

        cartContainer.appendChild(cartItem);

    });

    calculateTotal();

}

// 7. Calculate total price
function calculateTotal() {

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    totalElement.textContent =
        total.toLocaleString() + " RWF";

}

// 8. Increase food quantity
function increaseQuantity(foodId) {

    const item = cart.find(food => food.id === foodId);

    if (item) {

        item.quantity++;

        displayCart();

    }

}

// 9. Decrease food quantity
function decreaseQuantity(foodId) {

    const item = cart.find(food => food.id === foodId);

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {

            removeFromCart(foodId);

        } else {

            displayCart();

        }

    }

}

// 10. Remove food from cart
function removeFromCart(foodId) {

    cart = cart.filter(item => item.id !== foodId);

    displayCart();

}

// 11. Handle button clicks
document.addEventListener("click", function(event) {

    const button = event.target;

    if (button.classList.contains("add-btn")) {

        addToCart(Number(button.dataset.id));

    }

    if (button.classList.contains("increase-btn")) {

        increaseQuantity(Number(button.dataset.id));

    }

    if (button.classList.contains("decrease-btn")) {

        decreaseQuantity(Number(button.dataset.id));

    }

    if (button.classList.contains("remove-btn")) {

        removeFromCart(Number(button.dataset.id));

    }

});

// 12. Place food order
checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

        return;

    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const confirmation = confirm(
        "Are you sure you want to place this order?\n" +
        "Total amount: " + total.toLocaleString() + " RWF"
    );

    if (confirmation) {

        alert("Your food order has been placed successfully!");

        cart = [];

        displayCart();

    }

});

// 13. Initialize the system
displayFoodItems();

displayCart();