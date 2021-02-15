import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from  'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { eateryListReducer, eateryDetailsReducer } from './reducers/eateryReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({

    eateryList: eateryListReducer,
    eateryDetails: eateryDetailsReducer,    
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
});

const cartItemsFromStorage= localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const eateryDetailsFromStorage= localStorage.getItem('eateryDetails') ? JSON.parse(localStorage.getItem('eateryDetails')) : {};
const customerMetaFromStorage= localStorage.getItem('customerMeta') ? JSON.parse(localStorage.getItem('customerMeta')) : {};
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {

    cart: {

        cartItems: cartItemsFromStorage,
        eateryDetails: eateryDetailsFromStorage,
        customerMeta: customerMetaFromStorage
    },
    userLogin: {

        userInfo: userInfoFromStorage
    }
}
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;