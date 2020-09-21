import React, {useState, useEffect, useRef, useCallback} from 'react'
import MapGL, {
  Source,
  Layer,
  GeolocateControl,
  NavigationControl
} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import {
  mapStyles,
  pointStyles,
  sidebarStyle,
  isochroneStyles,
  geolocateStyle,
  navStyle
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
    zoom: 12,
    minZoom: 2
  })
  const [searchResultLayer, setSearchResultLayer] = useState(null)
  const [isochroneCoordinates, setIsochroneCoordinates] = useState({
    latitude: viewport.latitude,
    longitude: viewport.longitude
  })
  const [grocers, setGrocers] = useState(null)
  const [profile, setProfile] = useState('walking')
  const [minutes, setMinutes] = useState(10)
  const [buroughs, setBuroughs] = useState([
    'Bronx',
    'Brooklyn',
    'Manhattan',
    'Queens',
    'StatenIsland'
  ])

  const mapRef = useRef()

  const _handleTimeChange = event => {
    setMinutes(event.target.value)
  }

  const _onViewportChange = viewport => {
    setViewport({...viewport})
  }

  const handleViewportChange = useCallback(
    newViewport => setViewport(newViewport),
    []
  )

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(newViewport => {
    const geocoderDefaultOverrides = {transitionDuration: 1000}
    console.log(newViewport)
    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides
    })
  }, [])

  const _onIsochroneClick = event => {
    setIsochroneCoordinates({
      latitude: event.lngLat[1],
      longitude: event.lngLat[0]
    })
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
    <div>
      <div className="sidebar">
        <label>
          Maximum Travel Time: {minutes} minutes {profile}{' '}
        </label>
        <input
          name="time"
          type="range"
          min={5}
          max={60}
          defaultValue={10}
          onChange={_handleTimeChange}
          step="1"
        />
        <button onClick={() => setProfile('walking')}>Walking</button>
        <button onClick={() => setProfile('cycling')}>Cycling</button>
        <button onClick={() => setProfile('driving')}>Driving</button>
      </div>
      <MapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
        onClick={_onIsochroneClick}
      >
        {/* <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={accessToken}
          position="top-right"
        /> */}
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
            isochroneCoordinates.longitude +
            ',' +
            isochroneCoordinates.latitude +
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
        <div style={navStyle}>
          <NavigationControl />
        </div>
      </MapGL>
    </div>
  )
}

export default Map
