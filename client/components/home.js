import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import {
  mapStyles,
  pointStyles,
  sidebarStyle,
  isochroneStyles
} from '../styles/mapStyles'

/**
 * COMPONENT
 */

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ2FueW1lZGUzMCIsImEiOiJjazV3b20zMWsxeDRnM3Jtam1iaTQ1N2kzIn0.oOGhQyN93k3NzPoEC56iIw'

const Home = () => {
  const [map, setMap] = useState(null)
  const [coordinates, setCoordinates] = useState([-73.886111, 40.837222])
  const [zoomLevel, setZoomLevel] = useState(12)
  const [urlBase, setUrlBase] = useState(
    'https://api.mapbox.com/isochrone/v1/mapbox/'
  )
  const [profile, setProfile] = useState('walking')
  const [minutes, setMinutes] = useState(10)
  const mapContainer = useRef(null)

  useEffect(
    () => {
      const initializeMap = ({setMap, mapContainer}) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: coordinates,
          zoom: zoomLevel
        })

        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

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

        const getIso = () => {
          const query =
            urlBase +
            profile +
            '/' +
            coordinates[0] +
            ',' +
            coordinates[1] +
            '?contours_minutes=' +
            minutes +
            '&polygons=true&access_token=' +
            mapboxgl.accessToken

          $.ajax({
            method: 'GET',
            url: query
          }).done(function(data) {
            map.getSource('iso').setData(data)
          })
        }

        map.on('load', function() {
          map.addSource('iso', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          })
          map.addLayer(isochroneStyles, 'poi-label')

          getIso()
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
      <div className="sidebarStyle">
        <div>
          <li>Longitude: {coordinates[0]}</li>
          <li>Latitude: {coordinates[1]}</li>
          <li>Zoom Level: {zoomLevel}</li>
        </div>
      </div>
      <div
        ref={el => (mapContainer.current = el)}
        style={mapStyles}
        className="mapContainer"
      />
    </div>
  )
}

export default Home

// import React, {useState, useEffect, useRef} from 'react'
// import axios from 'axios'
// import {useSelector, useDispatch} from 'react-redux'
// import {gotGrocers} from '../store/grocers'
// import mapboxgl from 'mapbox-gl'
// import {mapStyles, pointStyles, sidebarStyle} from '../styles/mapStyles'

// /**
//  * COMPONENT
//  */

// mapboxgl.accessToken =
//   'pk.eyJ1IjoiZ2FueW1lZGUzMCIsImEiOiJjazV3b20zMWsxeDRnM3Jtam1iaTQ1N2kzIn0.oOGhQyN93k3NzPoEC56iIw'

// const Home = () => {
//   const grocers = useSelector(state => state.grocers)
//   const dispatch = useDispatch()
//   const [map, setMap] = useState(null)
//   const [coordinates, setCoordinates] = useState([-73.886111, 40.837222])
//   const [zoomLevel, setZoomLevel] = useState(12)
//   const [urlBase, setUrlBase] = useState('https://api.mapbox.com/isochrone/v1/mapbox/')
//   const [profile, setProfile] = useState('walking')
//   const [minutes, setMinutes] = useState(10)
//   const mapContainer = useRef(null)

//   useEffect(
//     () => {
//       dispatch(gotGrocers())
//     }, []
//   )

//   useEffect(
//     () => {
//       console.log("grocers at useEffect", grocers)
//       const initializeMap = ({setMap, mapContainer}) => {
//         const map = new mapboxgl.Map({
//           container: mapContainer.current,
//           style: 'mapbox://styles/mapbox/streets-v11',
//           center: coordinates,
//           zoom: zoomLevel
//         })

//         map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

//         map.on('load', () => {
//           setMap(map)
//           map.resize()
//         })

//         map.on('load', async () => {
//           console.log("grocers at addSources", grocers)
//           map.addSource('bronx-grocers', {
//             type: 'geojson',
//             data: grocers
//           })
//           map.addLayer(pointStyles)
//         })

//         const getIso = () => {
//           const query = urlBase + profile + '/' + coordinates[0] + ',' + coordinates[1] + '?contours_minutes=' + minutes + '&polygons=true&access_token=' + mapboxgl.accessToken;

//           $.ajax({
//             method: 'GET',
//             url: query
//           }).done(function(data) {
//             map.getSource('iso').setData(data);
//           })
//         };

//         map.on('load', function() {
//           map.addSource('iso', {
//             type: 'geojson',
//             data: {
//               'type': 'FeatureCollection',
//               'features': []
//             }
//           });

//           map.addLayer({
//             'id': 'isoLayer',
//             'type': 'fill',
//             'source': 'iso',
//             'layout': {},
//             'paint': {
//               'fill-color': '#5a3fc0',
//               'fill-opacity': 0.3
//             }
//           }, "poi-label");

//           getIso();
//         });

//         map.on('move', () => {
//           setCoordinates([
//             map.getCenter().lng.toFixed(4),
//             map.getCenter().lat.toFixed(4)
//           ])
//           setZoomLevel(map.getZoom().toFixed(2))
//         })
//       }

//       if (!map) initializeMap({setMap, mapContainer})
//     },
//     [map]
//   )

//   return (
//     <div>
//       <div className="sidebarStyle">
//         <div>
//           <li>Longitude: {coordinates[0]}</li>
//           <li>Latitude: {coordinates[1]}</li>
//           <li>Zoom Level:{' '}{zoomLevel}</li>
//         </div>
//       </div>
//       <div ref={el => (mapContainer.current = el)} style={mapStyles} className="mapContainer"/>
//     </div>
//   )
// }

// export default Home
