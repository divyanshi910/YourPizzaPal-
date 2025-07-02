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

function preparePizzaCard(pizza){
    const ouputDiv = document.querySelector('#output');
     const colDiv= document.createElement('div');
     colDiv.className = 'col-4';
     const cardDiv = document.createElement('div');
     cardDiv.className = 'card';
     cardDiv.style = "width: 18rem";
     colDiv.appendChild(cardDiv);
     const img = document.createElement('img');
     img.src = pizza.url;
     img.className = 'card-img-top';
     cardDiv.appendChild(img);
     const cardBody = document.createElement('div');
     cardBody.className = 'cardBody';
     cardDiv.appendChild(cardBody);
     const h5 = document.createElement('h5');
     h5.className = 'card-title';
     h5.innerText = pizza.name;
     const pTag = document.createElement('p');
     pTag.className = 'card-text';
     pTag.innerText = pizza.desc;
     const button = document.createElement('button');
     button.setAttribute('product-id',pizza.id);
     button.addEventListener('click',addToCart);//event bind
     button.innerText = 'Add to Cart';
     button.className = 'btn btn-primary';
     cardBody.appendChild(h5);
     cardBody.appendChild(pTag);
     cardBody.appendChild(button);
     ouputDiv.appendChild(colDiv);
}