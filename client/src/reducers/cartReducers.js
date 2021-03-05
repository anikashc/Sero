import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_RESET,
    CART_SAVE_CUSTOMER_META,
    
} from '../constants/cartConstants'

export const cartReducer = (state ={cartItems:[], eateryDetails:{}, customerMeta:{}},action)=>{
    switch(action.type) {
        case CART_ADD_ITEM:
            const item  = action.payload
            const existItem  = state.cartItems.find(x=>x.product === item.product)
            if(item.eateryDetails._id!==state.eateryDetails._id){
                return {
                    ...state,
                    cartItems: [item],
                    eateryDetails: item.eateryDetails
                }
            }
            else{
                if(existItem){
                    if(item.qty===0){
                        return{
                            ...state,
                            cartItems: state.cartItems.filter((x)=>x.product!==item.product),
                            eateryDetails: state.cartItems.length===1? {} : item.eateryDetails
                        }
                    }
                    else{
                        return {
                            ...state,
                            cartItems: state.cartItems.map(x=> x.product=== existItem.product?item:x),
                            eateryDetails: item.eateryDetails
                        }
                    }
                    
                }
                else{
                    return {
                        ...state,
                        cartItems: [...state.cartItems, item],
                        eateryDetails: item.eateryDetails
                    }
                }
            }
        
        case CART_REMOVE_ITEM:
            const item1  = action.payload
            return{
                ...state,
                cartItems: state.cartItems.filter((x)=>x.product!==item1.product),
                eateryDetails: state.cartItems.length===1? {} : item1.eateryDetails

            }

        case CART_SAVE_CUSTOMER_META:
            
            return{
                ...state,
                customerMeta: action.payload.data,
            }

        case CART_RESET:
            localStorage.removeItem('cartItems')
            localStorage.removeItem('eateryDetails')
            localStorage.removeItem('customerMeta')
            return {
                cartItems: [],
                eateryDetails: {},
                customerMeta: {}
            }
            
        default : return state
    }
}