//Product Model (Blue Print)
//Pizza object ID, name,desc,Price,Rating,Image

class Product{
    constructor(id , name , desc , price , url){
        //this- keyword (contains current calling object reference)
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.url=url;
        this.isAddedInCart = false;
    }
}
export default Product;