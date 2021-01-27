import  {
    EATERY_DETAILS_FAIL,
    EATERY_DETAILS_REQUEST,
    EATERY_DETAILS_SUCCESS,
    EATERY_LIST_FAIL,
    EATERY_LIST_REQUEST,
    EATERY_LIST_SUCCESS
} from '../constants/eateryConstants'

export const eateryListReducer = (state={eateries: []},action)=>{
    switch(action.type){
        case EATERY_LIST_REQUEST: return { loading: true }

        case EATERY_LIST_SUCCESS: return {loading: false, eateries: action.payload}

        case EATERY_LIST_FAIL: return {loading: false, error: action.payload}

        default: return state

    }
}
export const eateryDetailsReducer = (state={eatery: {reviews:[] ,menu:[]}},action)=>{
    switch(action.type){
        case EATERY_DETAILS_REQUEST: return { loading: true, ...state}

        case EATERY_DETAILS_SUCCESS: return {loading: false, eatery: action.payload}

        case EATERY_DETAILS_FAIL: return {loading: false, error: action.payload}

        default: return state

    }
}