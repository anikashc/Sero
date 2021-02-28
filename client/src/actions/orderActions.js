import axios from 'axios'
import { 
  ORDER_CREATE_FAIL, 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS, 
  ORDER_DETAILS_FAIL, 
  ORDER_DETAILS_REQUEST, 
  ORDER_DETAILS_SUCCESS, 
  ORDER_LIST_MY_FAIL, 
  ORDER_LIST_MY_REQUEST, 
  ORDER_LIST_MY_SUCCESS
} from '../constants/orderConstants'
import { logout } from './userActions'
export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      })
  
      const { data } = await axios.post(`/api/orders`, order)
  
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
        
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

  export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      })
  
      const { data } = await axios.get(`/api/orders/${id}`)
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
     
      
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      })
    }
  }
  
  export const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/myorders`, config)
  
      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: message,
      })
    }
  }
  