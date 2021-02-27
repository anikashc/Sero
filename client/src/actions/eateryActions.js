import  {
    EATERY_LIST_REQUEST,
    EATERY_LIST_SUCCESS,
    EATERY_LIST_FAIL,
    EATERY_DETAILS_REQUEST,
    EATERY_DETAILS_SUCCESS,
    EATERY_DETAILS_FAIL,
    EATERY_DELETE_SUCCESS,
    EATERY_DELETE_REQUEST,
    EATERY_DELETE_FAIL,
    EATERY_CREATE_REQUEST,
    EATERY_CREATE_SUCCESS,
    EATERY_CREATE_FAIL,
    EATERY_UPDATE_REQUEST,
    EATERY_UPDATE_SUCCESS,
    EATERY_UPDATE_FAIL,
    EATERY_REVIEWS_FAIL,
    EATERY_REVIEWS_REQUEST,
    EATERY_REVIEWS_SUCCESS,
    EATERY_CREATE_REVIEW_FAIL,
    EATERY_CREATE_REVIEW_REQUEST,
    EATERY_CREATE_REVIEW_SUCCESS
} from '../constants/eateryConstants'
import axios from 'axios'
import { logout } from './userActions'

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

export const createEateryReview = (id, review) => async (dispatch, getState) => {
  try {
      dispatch({
          type: EATERY_CREATE_REVIEW_REQUEST,
      })

      const {
          userLogin: { userInfo },
      } = getState()

      const config = {
          headers: {
              //Authorization: `Bearer ${userInfo.token}`,
          },
      }

      await axios.post(`/api/eateries/${id}/reviews`, review, config)
      
      dispatch({
          type: EATERY_CREATE_REVIEW_SUCCESS,
      })
  } catch (error) {
      const message =
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      
      dispatch({
          type: EATERY_CREATE_REVIEW_FAIL,
          payload: message,
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

export const deleteEatery = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EATERY_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/api/eateries/${id}`, config)
  
      dispatch({
        type: EATERY_DELETE_SUCCESS,
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
        type: EATERY_DELETE_FAIL,
        payload: message,
      })
    }
  }
  
  export const createEatery = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: EATERY_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/eateries`, {}, config)
  
      dispatch({
        type: EATERY_CREATE_SUCCESS,
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
        type: EATERY_CREATE_FAIL,
        payload: message,
      })
    }
  }
  
export const updateEatery = (eatery) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EATERY_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/eateries/${eatery._id}`,eatery,config)

        dispatch({
            type: EATERY_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: EATERY_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: EATERY_UPDATE_FAIL,
            payload: message,
        })
    }
}