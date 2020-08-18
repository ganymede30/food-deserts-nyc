import axios from 'axios'

export const getGrocers = async () => {
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
  return grocers
}
