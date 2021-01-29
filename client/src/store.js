import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from  'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {eateryListReducer, eateryDetailsReducer} from './reducers/eateryReducers'
import { cartReducer} from './reducers/cartReducers'
const reducer = combineReducers({
    eateryList: eateryListReducer,
    eateryDetails: eateryDetailsReducer,    
    cart: cartReducer
})
const cartItemsFromStorage= localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')) : []
const eateryIdFromStorage= localStorage.getItem('cartItems')?Number(JSON.parse(localStorage.getItem('cartItems'))) : null

const initialState ={
    cart: {
        cartItems: cartItemsFromStorage,
        eateryId: eateryIdFromStorage
    } 
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware))
)
export default store


