//Products CRUD Operation (service logic)
//C -  Create , R - Read , U - Update , D - Delete
//contains the logic for fetching
//it talks to network layer to bring the JSON and convert JSON into objects vice-versa
import Product from "../models/product.js";
import  {doNetworkCall}  from "./api-client.js";

const productOperation = {
    products:[], //key:value pair
    search(pizzaId){
        const product = this.products.find(currentProduct=>currentProduct.id==pizzaId);
        console.log('Product Found ',product);
        product.isAddedInCart = true;
        console.log('Array ', this.products); 
    },
    getProductsInCart(){
       const productInBasket =  this.products.filter(product=>product.isAddedInCart);
       return productInBasket;
    },
    async loadProducts(){
        const pizzas = await doNetworkCall();
        const pizzaArray = pizzas['Vegetarian'];
        const productsArray = pizzaArray.map(pizza=>{
            const currentPizza=new Product(pizza.id , pizza.name , pizza.menu_description , pizza.price , pizza.assets.product_details_page[0].url);
            return currentPizza;
        })
        console.log('Product Array', productsArray);
        this.products = productsArray; //this is alias name
        return productsArray; //wrap in promise as async
    },
sortProducts(){

},
searchProducts(){

}
}
export default productOperation;