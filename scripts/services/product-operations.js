//Products CRUD Operation (service logic)
//C -  Create , R - Read , U - Update , D - Delete
//contains the logic for fetching
//it talks to network layer to bring the JSON and convert JSON into objects vice-versa
import Product from "../models/product.js";
import { doNetworkCall } from "./api-client.js";

const productOperation = {
    products: [],

    search(pizzaId) {
        const product = this.products.find(currentProduct => currentProduct.id == pizzaId);
        console.log('Product Found ', product);

        if (product) {
            if (!product.quantity) {
                product.quantity = 1;  // first time adding
            } else {
                product.quantity += 1; // increment if already in cart
            }
            product.isAddedInCart = true;  // keep a flag for UI if needed
        }

        console.log('Updated Array ', this.products);
    },

    getProductsInCart() {
        // return only those products added to cart
        const productInBasket = this.products.filter(product => product.isAddedInCart);
        return productInBasket;
    },

     // ===== New method: Calculate total cart amount =====
    getCartTotal() {
        const cart = this.getProductsInCart();
        return cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    },

    // ===== New method: Calculate total in INR from USD =====
    getCartTotalInINR(usdToInrRate = 83) {
        const totalUSD = this.getCartTotal();
        return totalUSD * usdToInrRate;
    },
    
    async loadProducts() {
        const pizzas = await doNetworkCall();
        const pizzaArray = pizzas['Vegetarian'];

        const productsArray = pizzaArray.map(pizza => {
            const currentPizza = new Product(
                pizza.id,
                pizza.name,
                pizza.menu_description,
                pizza.price,
                pizza.assets.product_details_page[0].url
            );

            currentPizza.isAddedInCart = false;
            currentPizza.quantity = 0;  // ✅ start with 0 quantity

            return currentPizza;
        });

        console.log('Product Array', productsArray);
        this.products = productsArray;
        return productsArray;
    },

    sortProducts() {
        // to be implemented later
    },

    searchProducts() {
        // to be implemented later
    }
};

export default productOperation;
