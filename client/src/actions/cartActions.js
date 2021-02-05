import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_CUSTOMER_META} from '../constants/cartConstants'

export const addToCart = (product,eateryDetails,qty) => async (dispatch, getState)=>{
    const item= product


    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: item._id,
            name: item.name,
            cost: item.cost,
            category: item.category,
            image: item.image,
            isAvailable: item.isAvailable,
            qty,
            eateryDetails
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    localStorage.setItem('eateryDetails', JSON.stringify(getState().cart.eateryDetails))
}

export const removeFromCart = (productId,eateryDetails) => (dispatch, getState)=>{

    dispatch({
        type: CART_REMOVE_ITEM,
        payload:{
            product: productId,
            eateryDetails
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    localStorage.setItem('eateryDetails', JSON.stringify(getState().cart.eateryDetails))
}

export const saveCustomerMeta = (data) => (dispatch)=>{

    dispatch({
        type: CART_SAVE_CUSTOMER_META,
        payload:{
            data
        }
    })
    localStorage.setItem('customerMeta', JSON.stringify(data))
    
}