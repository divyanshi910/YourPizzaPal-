//Glue B/W View and Model
//Controller UI I/O View Layer


import productOperation from "../services/product-operations.js";

//Data exchange b/w View and Model
async function loadPizzas(){
const pizzas= await productOperation.loadProducts();
console.log('Pizzas are ', pizzas);
for(let pizza of pizzas){
    preparePizzaCard(pizza);
    }
}
loadPizzas();

/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */
function addToCart(){
    //this- keyword(Current calling object reference)
    console.log("Add to Cart Called..",this);
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('product-id');
    console.log('Pizza Id is ' , pizzaId);
    productOperation.search(pizzaId);
    printBasket();
}

function printBasket(){
    const cartProducts = productOperation.getProductsInCart();
    const basket = document.querySelector('#basket');
    basket.innerHTML = '';
    let total=0
    for(let product of cartProducts){
       const li= document.createElement('li');
        li.innerText = `${product.name} - ${product.price}`;
        basket.appendChild(li);
        total +=Number(product.price);
    }
    const totalLi=document.createElement('li');
    totalLi.innerHTML = `<strong>Total: $${total}</strong>`;
    basket.appendChild(totalLi);
}

function preparePizzaCard(pizza) {
    const outputDiv = document.querySelector('#output');

    // responsive column with spacing
    const colDiv = document.createElement('div');
    colDiv.className = 'col-12 col-sm-6 col-md-4 mb-4';

    // card with equal height
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card h-100 shadow-sm rounded-3';
    colDiv.appendChild(cardDiv);

    // pizza image
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    img.alt = pizza.name;
    cardDiv.appendChild(img);

    // card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';
    cardDiv.appendChild(cardBody);

    // title
    const h5 = document.createElement('h5');
    h5.className = 'card-title fw-bold';
    h5.innerText = pizza.name;

    // description
    const pTag = document.createElement('p');
    pTag.className = 'card-text text-muted';
    pTag.innerText = pizza.desc;

    // extra info list
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

    // add-to-cart button at bottom
    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addToCart);
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary mt-auto';

    // append elements
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(listGroup);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
}
