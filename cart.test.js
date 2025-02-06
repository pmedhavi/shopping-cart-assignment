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
        axios.get.mockResolvedValueOnce({data:{price:2.52}});
        axios.get.mockResolvedValueOnce({data:{price:9.98}});
        await cart.addProduct('cornflakes',2);
        await cart.addProduct('weetabix',1);
        
        const state=cart.calculateCartState();
        expect(state.subtotal).toBe(15.02);
        expect(state.tax).toBe(1.88);
        expect(state.total).toBe(16.90);
    });
});