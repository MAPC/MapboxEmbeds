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
  style: 'mapbox://styles/ihill/ckbwj9b7t16h11htdrlq9ondi/draft',
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
map.scrollZoom.disable();

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

  map.addLayer({
    id: 'Existing Unimproved Shared Use Paths',
    type: 'line',
    'source-layer': 'Existing Unimproved Shared Use Paths',
    layout: {
      'line-cap': 'butt',
      'line-join': 'miter',
      'visibility': 'none',
    },
    paint: {
      'line-color': '#4BAA40',
      'line-width': 2,
    },
    source: {
      type: 'vector',
      id: 'MAPC trail vector tiles',
      tiles: ['https://tiles.arcgis.com/tiles/c5WwApDsDjRhIVkH/arcgis/rest/services/Walking_trail_vector_tiles/VectorTileServer/tile/{z}/{y}/{x}.pbf'],
    }
  })
  var activeChapterName = 'item1';


  document.onscroll = function(e) {
    var chapterNames = ['item1', 'item2', 'item3']
    for (var i = 0; i < chapterNames.length; i++) {
      var chapterName = chapterNames[i]
        if (isElementOnScreen(chapterName)) {
          setActiveChapter(chapterName);
          break;
      }
    }
  };
  
  function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
  }
  

  function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;
    if (chapterName === 'item1') {
      map.setLayoutProperty('Existing Unimproved Shared Use Paths', 'visibility', 'none')
      map.setLayoutProperty('Testing Centers', 'visibility', 'visible');    
    } else if (chapterName === 'item2') {
      map.setLayoutProperty('Testing Centers', 'visibility', 'none');
      map.setLayoutProperty('Existing Unimproved Shared Use Paths', 'visibility', 'visible')
    } else if (chapterName === 'item3') {
      map.setLayoutProperty('Testing Centers', 'visibility', 'visible');
      map.setLayoutProperty('Existing Unimproved Shared Use Paths', 'visibility', 'visible')
    }
    activeChapterName = chapterName;
  }
  // document.querySelector('.print').addEventListener('click', (e) => {
  //   var img = map.getCanvas().toDataURL('image/png')
  //   document.querySelector('.print').href = img
  // })

  map.on('click', 'MAPC municipalities', (e) => {
    map.setPaintProperty('MAPC municipalities', 'fill-outline-color', ['match', ['get', 'muni_id'], [e.features[0].properties.muni_id], 'red', 'hsla(140, 0%, 0%, 0)'])
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.municipal)
    .addTo(map);
  })
  // console.log(map.getStyle())
})
