import React, {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import {gotGrocers} from '../store/grocers'
import mapStyles from '../styles/mapStyles'

/**
 * COMPONENT
 */

export default function Home() {
  const grocers = useSelector(state => state.grocers)
  const dispatch = useDispatch()
  const [map, setMap] = useState(null)
  const [coordinates, setCoordinates] = useState([-73.886111, 40.837222])
  const mapContainer = useRef(null)

  useEffect(() => {
    dispatch(gotGrocers())
  }, [])

  useEffect(
    () => {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiZ2FueW1lZGUzMCIsImEiOiJjazV3b20zMWsxeDRnM3Jtam1iaTQ1N2kzIn0.oOGhQyN93k3NzPoEC56iIw'
      const initializeMap = ({setMap, mapContainer}) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
          center: coordinates,
          zoom: 12
        })

        map.on('load', () => {
          setMap(map)
          map.resize()
        })
      }

      if (!map) initializeMap({setMap, mapContainer})
    },
    [map]
  )

  return <div ref={el => (mapContainer.current = el)} style={mapStyles} />
}
