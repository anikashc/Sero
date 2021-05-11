import { ORDER_CANCEL_FAIL, ORDER_CANCEL_REQUEST, ORDER_CANCEL_RESET, ORDER_CANCEL_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_COMPLETED_FAIL, ORDER_COMPLETED_REQUEST, ORDER_COMPLETED_RESET, ORDER_COMPLETED_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_RESET, ORDER_LIST_MY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_PAYMENT_DONE_SUCCESS, ORDER_PAYMENT_DONE_REQUEST, ORDER_PAYMENT_DONE_FAIL, ORDER_PAYMENT_DONE_RESET, ORDER_EDIT_REQUEST, ORDER_EDIT_SUCCESS, ORDER_EDIT_FAIL, ORDER_EDIT_RESET } from "../constants/orderConstants"

  
  export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true }
      case ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, order: action.payload }
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case ORDER_CREATE_RESET:
        return {}
      default:
        return state
    }
}

export const orderEditReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_EDIT_REQUEST:
      return { loading: true }
    case ORDER_EDIT_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_EDIT_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_EDIT_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], customerMeta: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        order: action.payload,
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_COMPLETED_REQUEST:
      return {
        loading: true,
      }
    case ORDER_COMPLETED_SUCCESS:
      return {
        order: action.payload,
        loading: false,
        success: true,
      }
    case ORDER_COMPLETED_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    // case ORDER_COMPLETED_RESET:
    //   return {}
    default:
      return state
  }
}

export const orderCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CANCEL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CANCEL_SUCCESS:
      return {
        order: action.payload,
        loading: false,
        success: true,
      }
    case ORDER_CANCEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_CANCEL_RESET:
      return {}
    default:
      return state
  }
}

export const orderCustomerPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_DONE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAYMENT_DONE_SUCCESS:
      return {
        order: action.payload,
        loading: false,
        success: true,
      }
    case ORDER_PAYMENT_DONE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAYMENT_DONE_RESET:
      return {}
    default:
      return state
  }
}