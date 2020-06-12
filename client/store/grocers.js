import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_GROCERS = 'GET_GROCERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getGrocers = grocers => ({type: GET_GROCERS, grocers})

/**
 * THUNK CREATORS
 */
export const gotGrocers = () => async (dispatch, next) => {
  try {
    const {data} = await axios.get('/api/grocers')
    console.log('working')
    dispatch(getGrocers(data))
  } catch (error) {
    next(error)
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_GROCERS:
      return action.grocers
    default:
      return state
  }
}
