const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const queryStr = 'https://data.ny.gov/resource/9a8c-vfzj.json?county=Bronx'
    const {data} = await axios.get(queryStr)
    res.json(data)
  } catch (error) {
    next(error)
  }
})
