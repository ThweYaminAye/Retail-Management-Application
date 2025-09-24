import type {Product}  from "@/shared/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface cartItem extends Product{
    quantity : number,
    cost : number
}

export interface cartState {
    items : cartItem[]
}

const initialState: cartState = {
    items: [],
}
export const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.items.find((item : cartItem) => item.productID === action.payload.productID);
            
            if(existingProduct ){
                existingProduct.quantity +=1
                existingProduct.cost = existingProduct.quantity * existingProduct.sellingPrice;
                
            }else{
                // state.items.push({...action.payload,
                //     quantity: 1,
                //     cost: action.payload.sellingPrice})
                return {items:[...state.items,{...action.payload,quantity: 1, cost: action.payload.sellingPrice}]}
            }
        },

        increaseQuantity: (state, action: PayloadAction<cartItem> ) => {
            const cartData = state.items.find((item:cartItem) => item.productID === action.payload.productID);
            if (cartData) {
              cartData.quantity += 1;
              cartData.cost = cartData.quantity * cartData.sellingPrice;
            } 
          },

        decreaseQuantity: (state, action: PayloadAction<cartItem> ) => {
            const cartData = state.items.find((item:cartItem) => item.productID === action.payload.productID);
            if (cartData) {
                cartData.quantity -= 1;
                cartData.cost = cartData.quantity * cartData.sellingPrice;
            } 
          },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
              (item) => item.productID !== action.payload
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
        
    }
    

}
)

    

export const {addToCart, increaseQuantity,decreaseQuantity, removeFromCart, clearCart} = CartSlice.actions
export default CartSlice.reducer