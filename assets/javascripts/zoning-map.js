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
  style: 'mapbox://styles/ihill/ckb7xc2iq1sxf1ip9rdi5x0u6/',
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

map.on('load', () => {
  document.querySelector('.print').addEventListener('click', (e) => {
    var img = map.getCanvas().toDataURL('image/png')
    document.querySelector('.print').href = img
  })
})
