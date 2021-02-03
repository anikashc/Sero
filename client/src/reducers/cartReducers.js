import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_CUSTOMER_META
} from '../constants/cartConstants'

export const cartReducer = (state ={cartItems:[], eateryId:null, customerMeta:{}},action)=>{
    switch(action.type) {
        case CART_ADD_ITEM:
            const item  = action.payload
            const existItem  = state.cartItems.find(x=>x.product === item.product)
            if(item.id!==state.eateryId){
                return {
                    ...state,
                    cartItems: [item],
                    eateryId: item.id
                }
            }
            else{
                if(existItem){
                    if(item.qty===0){
                        return{
                            ...state,
                            cartItems: state.cartItems.filter((x)=>x.product!==item.product),
                            eateryId: state.cartItems.length===1? null : item.id
                        }
                    }
                    else{
                        return {
                            ...state,
                            cartItems: state.cartItems.map(x=> x.product=== existItem.product?item:x),
                            eateryId: item.id
                        }
                    }
                    
                }
                else{
                    return {
                        ...state,
                        cartItems: [...state.cartItems, item],
                        eateryId: item.id
                    }
                }
            }
        
        case CART_REMOVE_ITEM:
            const item1  = action.payload
            return{
                ...state,
                cartItems: state.cartItems.filter((x)=>x.product!==item1.product),
                eateryId: state.cartItems.length===1? null : item1.id

            }

        case CART_SAVE_CUSTOMER_META:
            
            return{
                ...state,
                customerMeta: action.payload,

            }
            
        default : return state
    }
}