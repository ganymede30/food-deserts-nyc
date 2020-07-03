import React, {useState, useEffect, useRef, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import {gotGrocers} from '../store/grocers'
import {mapStyles, pointStyles} from '../styles/mapStyles'

/**
 * COMPONENT
 */

const Home = () => {
  const grocers = useSelector(state => state.grocers)
  const dispatch = useDispatch()
  // const setGrocers = useCallback(
  //   () => dispatch(gotGrocers()), [dispatch]
  //   )
  const [grocersGeoJSON, setGrocersGeoJSON] = useState(grocers)
  const [map, setMap] = useState(null)
  const [coordinates, setCoordinates] = useState([-73.886111, 40.837222])
  const [zoomLevel, setZoomLevel] = useState(12)
  const mapContainer = useRef(null)

  useEffect(() => {
    dispatch(gotGrocers())
  }, [])

  useEffect(
    () => {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiZ2FueW1lZGUzMCIsImEiOiJjazV3b20zMWsxeDRnM3Jtam1iaTQ1N2kzIn0.oOGhQyN93k3NzPoEC56iIw'
      const initializeMap = ({setMap, mapContainer}) => {
        console.log('initialize map going off')
        console.log('initialize map grocersGeoJSON', grocersGeoJSON)

        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
          center: coordinates,
          zoom: zoomLevel
        })

        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

        map.on('load', () => {
          setMap(map)
          map.resize()
        })

        map.on('load', () => {
          console.log('coordinates', coordinates)
          console.log("map.on('load') grocersGeoJSON", grocersGeoJSON)
          map.addSource('bronx-grocers', {
            type: 'geojson',
            data: grocersGeoJSON
          })
          map.addLayer(pointStyles)
        })

        map.on('move', () => {
          setCoordinates([
            map.getCenter().lng.toFixed(4),
            map.getCenter().lat.toFixed(4)
          ])
          setZoomLevel(map.getZoom().toFixed(2))
        })
      }

      if (!map) initializeMap({setMap, mapContainer})
    },
    [map]
  )

  return (
    <div>
      <div>
        <div>
          Longitude: {coordinates[0]} | Latitude: {coordinates[1]} | Zoom Level:{' '}
          {zoomLevel}
        </div>
      </div>
      <div ref={el => (mapContainer.current = el)} style={mapStyles} />
    </div>
  )
}

export default Home
