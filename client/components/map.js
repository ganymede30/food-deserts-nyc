import React, {useState, useEffect} from 'react'
import MapGL, {Source, Layer, GeolocateControl} from 'react-map-gl'
import {
  mapStyles,
  pointStyles,
  sidebarStyle,
  isochroneStyles,
  geolocateStyle
} from '../styles/mapStyles'
import axios from 'axios'

const accessToken =
  'pk.eyJ1IjoiZ2FueW1lZGUzMCIsImEiOiJjazV3b20zMWsxeDRnM3Jtam1iaTQ1N2kzIn0.oOGhQyN93k3NzPoEC56iIw'

const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/'

const Map = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: 'calc(100vh - 80px)',
    position: 'absolute',
    latitude: 40.837222,
    longitude: -73.886111,
    zoom: 12
  })

  const [grocers, setGrocers] = useState(null)
  const [isLoaded, setIsLoaded] = useState(true)
  const [items, setItems] = useState(null)
  const [profile, setProfile] = useState('walking')
  const [minutes, setMinutes] = useState(10)
  const [buroughs, setBuroughs] = useState([
    'Bronx',
    'Brooklyn',
    'Manhattan',
    'Queens',
    'StatenIsland'
  ])

  const _onViewportChange = viewport => {
    setViewport({...viewport})
  }

  useEffect(() => {
    async function grabData() {
      let geojson = {
        type: 'FeatureCollection',
        features: []
      }
      for (let i = 0; i < buroughs.length; i++) {
        let fetcher = await axios.get(`/api/grocers/${buroughs[i]}`)
        geojson.features.push(...fetcher.data.features)
      }
      setGrocers(geojson)
    }
    grabData()
  }, [])

  return (
    <div style={{margin: '0 auto'}}>
      {/* <h1> Longitude: {grocers.type}</h1> */}
      <MapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={mapStyles}
        onViewportChange={_onViewportChange}
      >
        <Source id="ny-grocers" type="geojson" data={grocers}>
          <Layer {...pointStyles} />
        </Source>

        <Source
          id="iso"
          type="geojson"
          data={
            urlBase +
            profile +
            '/' +
            viewport.longitude +
            ',' +
            viewport.latitude +
            '?contours_minutes=' +
            minutes +
            '&polygons=true&access_token=' +
            accessToken
          }
        >
          <Layer {...isochroneStyles} />
        </Source>

        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  )
}

export default Map
