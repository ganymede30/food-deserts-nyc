import React, {useState, useEffect, useRef} from 'react'
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import mapboxgl from 'mapbox-gl'
// import "../../node_modules/mapbox-gl/dist/mapbox-gl.css"
import {gotGrocers} from '../store/grocers'

/**
 * STYLES
 */

const styles = {
  width: '100vw',
  height: 'calc(100vh - 80px)',
  position: 'absolute'
}

/**
 * COMPONENT
 */

export default function Home() {
  const grocers = useSelector(state => state.grocers)
  const dispatch = useDispatch()
  const [map, setMap] = useState(null)
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
          center: [-73.886111, 40.837222],
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

  return <div ref={el => (mapContainer.current = el)} style={styles} />
}
