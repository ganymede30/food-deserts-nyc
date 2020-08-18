import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import {mapStyles, pointStyles} from '../styles/mapStyles'

/**
 * COMPONENT
 */

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ2FueW1lZGUzMCIsImEiOiJjazV3b20zMWsxeDRnM3Jtam1iaTQ1N2kzIn0.oOGhQyN93k3NzPoEC56iIw'

const Home = () => {
  const [grocers, setGrocers] = useState(null)
  const [map, setMap] = useState(null)
  const [coordinates, setCoordinates] = useState([-73.886111, 40.837222])
  const [zoomLevel, setZoomLevel] = useState(12)
  const mapContainer = useRef(null)

  useEffect(
    () => {
      const initializeMap = ({setMap, mapContainer}) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
          center: coordinates,
          zoom: zoomLevel
        })

        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
        map.doubleClickZoom.disable()

        map.on('load', () => {
          setMap(map)
          map.resize()
        })

        map.on('load', async () => {
          const fetcher = await axios.get('/api/grocers')
          map.addSource('bronx-grocers', {
            type: 'geojson',
            data: fetcher.data
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
      <div>Test</div>
      <div ref={el => (mapContainer.current = el)} style={mapStyles} />
    </div>
  )
}

export default Home
