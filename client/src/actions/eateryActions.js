import  {
    EATERY_DETAILS_FAIL,
    EATERY_DETAILS_REQUEST,
    EATERY_DETAILS_SUCCESS,
    EATERY_LIST_FAIL,
    EATERY_LIST_REQUEST,
    EATERY_LIST_SUCCESS,
    EATERY_REVIEWS_FAIL,
    EATERY_REVIEWS_REQUEST,
    EATERY_REVIEWS_SUCCESS
} from '../constants/eateryConstants'
import axios from 'axios'

export const listEateries = () => async(dispatch) => {
    try {
        dispatch({ type: EATERY_LIST_REQUEST})

        const {data} = await axios.get('/api/eateries')

        dispatch({
            type: EATERY_LIST_SUCCESS,
            payload: data
        })

    }
    catch(error){
        dispatch({
            type: EATERY_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listEateryDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: EATERY_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/eateries/${id}`)

        dispatch({
            type: EATERY_DETAILS_SUCCESS,
            payload: data
        })

    }
    catch(error){
        dispatch({
            type: EATERY_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getEateryReviews = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EATERY_REVIEWS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/eateries/${id}/reviews`, config)
        
        console.log(data)
        dispatch({
            type: EATERY_REVIEWS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        
        dispatch({
            type: EATERY_REVIEWS_FAIL,
            payload: message,
        })
    }
}