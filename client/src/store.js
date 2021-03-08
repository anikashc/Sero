import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from  'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    eateryListReducer,
    eateryDetailsReducer,
    eateryReviewsReducer,
    eateryCreateReducer,
    eateryDeleteReducer,
    eateryUpdateReducer,
    eateryCreateReviewReducer
} from './reducers/eateryReducers';
import { cartReducer } from './reducers/cartReducers';
import { 
    userLoginReducer, 
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers';

import {
    orderCreateReducer,
    orderListMyReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderCancelReducer,
    orderCompleteReducer,
    orderCustomerPaidReducer
} from './reducers/orderReducer'
const reducer = combineReducers({

    eateryList: eateryListReducer,
    eateryDetails: eateryDetailsReducer,
    eateryCreateReview: eateryCreateReviewReducer,
    eateryReviews: eateryReviewsReducer,
    eateryDelete: eateryDeleteReducer,
    eateryUpdate: eateryUpdateReducer,
    eateryCreate: eateryCreateReducer,    
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderListMy: orderListMyReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderCancel: orderCancelReducer,
    orderComplete: orderCompleteReducer,
    orderCustomerPaid: orderCustomerPaidReducer

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