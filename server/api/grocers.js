const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const queryStr =
      'https://data.ny.gov/resource/9a8c-vfzj.json?$where=(county=%27Bronx%27%20OR%20county=%27Queens%27%20OR%20county=%27Kings%27%20OR%20county=%27Richmond%27%20OR%20county=%27New%20York%27)'
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
            name: grocer.dba_name,
            county: grocer.county
          }
        }))
    }
    res.json(grocers)
  } catch (error) {
    next(error)
  }
})

router.get('/Bronx', async (req, res, next) => {
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

router.get('/Brooklyn', async (req, res, next) => {
  try {
    const queryStr = 'https://data.ny.gov/resource/9a8c-vfzj.json?county=Kings'
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

router.get('/Manhattan', async (req, res, next) => {
  try {
    const queryStr =
      'https://data.ny.gov/resource/9a8c-vfzj.json?county=New%20York'
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

router.get('/Queens', async (req, res, next) => {
  try {
    const queryStr = 'https://data.ny.gov/resource/9a8c-vfzj.json?county=Queens'
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

router.get('/StatenIsland', async (req, res, next) => {
  try {
    const queryStr =
      'https://data.ny.gov/resource/9a8c-vfzj.json?county=Richmond'
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
