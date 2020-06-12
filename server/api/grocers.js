const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const queryStr = 'https://data.ny.gov/resource/9a8c-vfzj.json?county=Bronx'
    const {data} = await axios.get(queryStr)
    const grocers = data.map(point => ({
      city: point.city,
      county: point.county,
      state: point.state,
      dba_name: point.dba_name,
      zip_code: point.zip_code,
      address: point.location.human_address,
      latitude: point.location.latitude,
      longitude: point.location.longitude
    }))

    //console.log(Array.isArray(data))
    //   .then(locations => {
    //   const { locations } = grocers
    //   console.log(locations)
    //   return locations.map(point => ({
    //     city: point.city,
    //     county: point.county,
    //     state: point.state,
    //     dba_name: point.dba_name,
    //     zip_code: point.zip_code,
    //     address: point.location.human_address,
    //     latitude: point.location.latitude,
    //     longitude: point.location.longitude
    //   }))
    // })
    res.json(grocers)
  } catch (error) {
    next(error)
  }
})
