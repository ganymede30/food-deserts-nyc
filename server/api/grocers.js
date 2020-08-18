const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const queryStr = 'https://data.ny.gov/resource/9a8c-vfzj.json?county=Bronx'
    const {data} = await axios.get(queryStr)
    const grocers = {
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
    res.json(grocers)
  } catch (error) {
    next(error)
  }
})
