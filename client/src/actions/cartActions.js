import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_CUSTOMER_META} from '../constants/cartConstants'

export const addToCart = (productId,id,qty) => async (dispatch, getState)=>{
    const {data} = await axios.get(`/api/eateries/${id}`)
    const item = data.menu.find(obj => obj._id === productId);


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
            id
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    localStorage.setItem('eateryId', JSON.stringify(getState().cart.eateryId))
}

export const removeFromCart = (productId,id) => (dispatch, getState)=>{

    dispatch({
        type: CART_REMOVE_ITEM,
        payload:{
            product: productId,
            id
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    localStorage.setItem('eateryId', JSON.stringify(getState().cart.eateryId))
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