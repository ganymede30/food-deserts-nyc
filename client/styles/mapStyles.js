export const mapStyles = {
  width: '100vw',
  height: 'calc(100vh - 80px)',
  position: 'absolute'
}

export const pointStyles = {
  id: 'park-volcanoes',
  type: 'circle',
  source: 'bronx-grocers',
  paint: {
    'circle-radius': 6,
    'circle-color': '#B42222'
  },
  filter: ['==', '$type', 'Point']
}
