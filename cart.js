const axios=require('axios')
class ShoppingCart{
    constructor(){
        this.items=[] //array to store cart items
    }
    //adding a product to the cart
    async addProduct(productName,quantity){
        const price =await this.getProductPrice(productName)
        this.items.push({productName,quantity,price})
    }
    //getting the product's price from the price api
    async getProductPrice(productName){
        try{
            const response=await axios.get(`http://localhost:3001/products/${productName}`)
            return response.data.price;
        }catch (error){
            console.error(`Error fetching price for ${productName}:`, error.message)
            throw error;
        }
    }

    ///calculating the cart state
    calculateCartState(){
        const subtotal=this.items.reduce((sum,item)=>{  //1st question
            return sum+item.price*item.quantity;
        },0)
        const tax=subtotal*0.125;    //2nd question
        const total=subtotal+tax;    //3rd question
        return{                      //4th question for rounding them
            subtotal:Math.round(subtotal*100)/100,
            tax:Math.round(tax*100)/100,
            total:Math.round(total*100)/100,
        };

    }
    //get items present in the cart
    getCartItems(){
        return this.items;
    }
}

module.exports=ShoppingCart;