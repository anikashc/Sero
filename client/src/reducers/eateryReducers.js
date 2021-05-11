import  {
    EATERY_DETAILS_FAIL,
    EATERY_DETAILS_REQUEST,
    EATERY_DETAILS_SUCCESS,
    EATERY_LIST_FAIL,
    EATERY_LIST_REQUEST,
    EATERY_LIST_SUCCESS,
    EATERY_REVIEWS_FAIL,
    EATERY_REVIEWS_REQUEST,
    EATERY_REVIEWS_SUCCESS,
    EATERY_CREATE_FAIL,
    EATERY_CREATE_REQUEST,
    EATERY_CREATE_RESET,
    EATERY_CREATE_SUCCESS,
    EATERY_DELETE_FAIL,
    EATERY_DELETE_REQUEST,
    EATERY_DELETE_SUCCESS,
    EATERY_UPDATE_FAIL,
    EATERY_UPDATE_SUCCESS,
    EATERY_UPDATE_REQUEST,
    EATERY_UPDATE_RESET,
    EATERY_CREATE_REVIEW_FAIL,
    EATERY_CREATE_REVIEW_REQUEST,
    EATERY_CREATE_REVIEW_SUCCESS,
    EATERY_CREATE_REVIEW_RESET
} from '../constants/eateryConstants'

export const eateryListReducer = (state={eateries: []},action)=>{
    switch(action.type){
        case EATERY_LIST_REQUEST: return { loading: true }

        case EATERY_LIST_SUCCESS: return {loading: false, eateries: action.payload}

        case EATERY_LIST_FAIL: return {loading: false, error: action.payload}

        default: return state

    }
}
export const eateryDetailsReducer = (state={eatery: {menu:[]}},action)=>{
    switch(action.type){
        case EATERY_DETAILS_REQUEST: return { loading: true, ...state}

        case EATERY_DETAILS_SUCCESS: return {loading: false, eatery: action.payload}

        case EATERY_DETAILS_FAIL: return {loading: false, error: action.payload}

        default: return state

    }
}

export const eateryCreateReviewReducer = (state={},action)=>{
  switch(action.type){
      case EATERY_CREATE_REVIEW_REQUEST: return { loading: true }

      case EATERY_CREATE_REVIEW_SUCCESS: return {loading: false, success: true}

      case EATERY_CREATE_REVIEW_FAIL: return {loading: false, error: action.payload}

      case EATERY_CREATE_REVIEW_RESET: return {}

      default: return state

  }
}

export const eateryReviewsReducer = (state={reviews: []},action)=>{
    switch(action.type){
        case EATERY_REVIEWS_REQUEST: return { loading: true }

        case EATERY_REVIEWS_SUCCESS: return {loading: false, reviews: action.payload}

        case EATERY_REVIEWS_FAIL: return {loading: false, error: action.payload}

        default: return state

    }
}

export const eateryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EATERY_DELETE_REQUEST:
        return { loading: true }
      case EATERY_DELETE_SUCCESS:
        return { loading: false, success: true }
      case EATERY_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const eateryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case EATERY_CREATE_REQUEST:
        return { loading: true }
      case EATERY_CREATE_SUCCESS:
        return { loading: false, success: true, eatery: action.payload }
      case EATERY_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case EATERY_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
export const eateryUpdateReducer = (state = { eatery: {} }, action) => {
    switch (action.type) {
        case EATERY_UPDATE_REQUEST:
            return { loading: true }
        case EATERY_UPDATE_SUCCESS:
            return { loading: false, success: true, eatery: action.payload }
        case EATERY_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case EATERY_UPDATE_RESET:
            return { eatery: {} }
        default:
            return state
    }
}