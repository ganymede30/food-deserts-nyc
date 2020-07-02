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

    //There are errors in the grocer dataset so I had to filter out the edge cases//

    const grocersGeoJSON = {
      type: 'FeatureCollection',
      features: data
        .filter(
          grocer =>
            grocer.location !== undefined &&
            grocer.location.latitude !== undefined &&
            grocer.location.longitude !== undefined
        )
        .map((grocer, index) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(grocer.location.longitude),
              parseFloat(grocer.location.latitude)
            ]
          },
          properties: {
            id: index + 1,
            name: grocer.dba_name
          }
        }))
    }
    dispatch(getGrocers(grocersGeoJSON))
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GROCERS:
      return action.grocers
    default:
      return state
  }
}
