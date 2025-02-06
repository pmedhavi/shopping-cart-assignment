const ShoppingCart=require('./cart')
const axios=require('axios')
jest.mock('axios');

describe('ShoppingCart',()=>{
    let cart;
    beforeEach(()=>{
        cart=new ShoppingCart();
        axios.get.mockResolvedValue({data:{price:2.52}});
    });
    test('addProduct adds a product to the cart',async ()=>{
        await cart.addProduct('cornflakes',1);
        const items=cart.getCartItems();
        expect(items).toHaveLength(1);
        expect(items[0].productName).toBe('cornflakes');
        expect(items[0].quantity).toBe(1);
        expect(items[0].price).toBe(2.52);
    });
    test('calculateCartState returns correct totals',async ()=>{
        axios.get.mockResolvedValueOnce({data:{price:2.52}});  //for cornflakes
        axios.get.mockResolvedValueOnce({data:{price:9.98}});  //for weetabix
        axios.get.mockResolvedValueOnce({data:{price:8.43}});  //for cheerios 
        axios.get.mockResolvedValueOnce({data:{price:4.99}});  //for frosties
        axios.get.mockResolvedValueOnce({data:{price:4.68}});  //for shreddies
        await cart.addProduct('cornflakes',2);
        await cart.addProduct('weetabix',1);
        await cart.addProduct('cheerios',1);
        await cart.addProduct('frosties',1);
        await cart.addProduct('shreddies',1);
        
        const state=cart.calculateCartState();
        expect(state.subtotal).toBe(33.12);
        expect(state.tax).toBe(4.14);
        expect(state.total).toBe(37.26);
    });
});