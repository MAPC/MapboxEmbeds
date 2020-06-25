mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';
let zoom = 9;
let center = [-71.0408, 42.3317];
if (window.innerWidth <= 500) {
  zoom = 7.75;
  center = [-71.109, 42.356];
} else if (window.innerWidth <= 700) {
  zoom = 8.27;
  center = [-70.89, 42.369];
}

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ihill/ck92yirkh2mt71ho83t7y60m9',
  center,
  zoom,
  minZoom: 6,
  maxZoom: 13,
  maxBounds: [
    [-74.728, 38.167], // Southwest bound
    [-66.541, 46.032], // Northeast bound
  ],
  preserveDrawingBuffer: true
});


map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
map.addControl(new mapboxgl.GeolocateControl(), 'top-left');
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    bbox: [-73.613892, 41.199323, -69.631348, 42.960443], // Northeast bound
  }), 'top-left'
);

map.on('load', () => {
  map.addLayer({
    id: 'Testing Centers',
    type: 'circle',
    source: {
      type: 'geojson',
      data: 'https://services1.arcgis.com/TXaY625xGc0yvAuQ/arcgis/rest/services/Test_Sites_Public/FeatureServer/0/query?where=OBJECTID_1+%3D+OBJECTID_1&outfields=*&f=pgeojson',
    },
    paint: {
      'circle-color': '#FFFFFF',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#03332D',
    },
  });
  document.querySelector('.print').addEventListener('click', (e) => {
    var img = map.getCanvas().toDataURL('image/png')
    document.querySelector('.print').href = img
  })

  // Can't query based on conditional styling, but can based on property matches; will need to do this alongside setting paint property (opacity)
  // when filtering features
  map.setPaintProperty('Testing Centers', 'circle-color', ['match', ['get', 'FID'], [36], 'blue', 'white'])
  map.on('click', 'Testing Centers', (e) => {
    if (e.features[0].properties.status == 'Remove') {
      console.log("!")
    }
    console.log(e.features[0])
  })

  map.on('click', 'MAPC municipalities', (e) => {
    map.setPaintProperty('MAPC municipalities', 'fill-outline-color', ['match', ['get', 'muni_id'], [e.features[0].properties.muni_id], 'red', 'hsla(140, 0%, 0%, 0)'])
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.municipal)
    .addTo(map);
  })
  console.log(map.getStyle())
})
