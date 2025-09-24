//Glue B/W View and Model
//Controller UI I/O View Layer


import productOperation from "../services/product-operations.js";

// Load and display pizzas
async function loadPizzas() {
    const pizzas = await productOperation.loadProducts();
    console.log('Pizzas are ', pizzas);
    for (let pizza of pizzas) {
        preparePizzaCard(pizza);
    }
}
loadPizzas();

// Add to cart handler
function addToCart() {
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('product-id');
    productOperation.search(pizzaId);
    printBasket();
    initRazorpay(); // update Razorpay amount whenever cart changes
}

// Print cart sidebar
function printBasket() {
    const cartProducts = productOperation.getProductsInCart();
    const basket = document.querySelector('#basket');
    basket.innerHTML = '';
    let totalUSD = 0;

    for (let product of cartProducts) {
        const li = document.createElement('li');
        li.innerText = `${product.name} (x${product.quantity}) - $${(product.price * product.quantity).toFixed(2)}`;
        basket.appendChild(li);
        totalUSD += product.price * product.quantity;
    }

    const totalLi = document.createElement('li');
    totalLi.innerHTML = `<strong>Total: $${totalUSD.toFixed(2)}</strong>`;
    basket.appendChild(totalLi);
}

// Prepare pizza card
function preparePizzaCard(pizza) {
    const outputDiv = document.querySelector('#output');

    const colDiv = document.createElement('div');
    colDiv.className = 'col-12 col-sm-6 col-md-4 mb-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card h-100 shadow-sm rounded-3';
    colDiv.appendChild(cardDiv);

    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    img.alt = pizza.name;
    cardDiv.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';
    cardDiv.appendChild(cardBody);

    const h5 = document.createElement('h5');
    h5.className = 'card-title fw-bold';
    h5.innerText = pizza.name;

    const pTag = document.createElement('p');
    pTag.className = 'card-text text-muted';
    pTag.innerText = pizza.desc;

    const listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-flush mb-3';

    const priceLi = document.createElement('li');
    priceLi.className = 'list-group-item';
    priceLi.innerHTML = `💲 <strong>Price:</strong> $${pizza.price}`;

    const categoryLi = document.createElement('li');
    categoryLi.className = 'list-group-item';
    categoryLi.innerHTML = `🍴 <strong>Category:</strong> ${pizza.category || "Veg"}`;

    const caloriesLi = document.createElement('li');
    caloriesLi.className = 'list-group-item';
    caloriesLi.innerHTML = `🔥 <strong>Calories:</strong> ${pizza.calories || "250"} kcal`;

    listGroup.appendChild(priceLi);
    listGroup.appendChild(categoryLi);
    listGroup.appendChild(caloriesLi);

    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addToCart);
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary mt-auto';

    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(listGroup);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
}

// Initialize Razorpay dynamically
function initRazorpay() {
    const usdToInrRate = 83; // USD → INR
    const totalUSD = productOperation.getCartTotal(); // sum in USD
    const totalINR = totalUSD * usdToInrRate;
    const amountInPaise = Math.round(totalINR * 100).toString(); // Razorpay expects paise

    if (amountInPaise <= 0) {
        document.getElementById('rzp-button1').disabled = true;
        return;
    } else {
        document.getElementById('rzp-button1').disabled = false;
    }

    const options = {
        key: "rzp_test_R7CjLn6UKO34Vy",
        amount: amountInPaise,
        currency: "INR",
        name: "YourPizzaPal",
        description: "Pizza Shop Transaction",
        handler: function(response) {
            alert("Payment Done! ID: " + response.razorpay_payment_id);
        }
    };

    const rzp1 = new Razorpay(options);
    document.getElementById('rzp-button1').onclick = function(e) {
        rzp1.open();
        e.preventDefault();
    }
}


