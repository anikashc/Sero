import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from  'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {eateryListReducer, eateryDetailsReducer} from './reducers/eateryReducers'
const reducer = combineReducers({
    eateryList: eateryListReducer,
    eateryDetails: eateryDetailsReducer

})

const initialState ={}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware))
)
export default store


