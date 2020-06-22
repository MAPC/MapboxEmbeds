mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';
let zoom = 8.4;
let center = [-70.944, 42.37];
if (window.innerWidth <= 480) {
  zoom = 7.75;
  center = [-71.043, 42.372];
} else if (window.innerWidth <= 670) {
  zoom = 8.27;
  center = [-71.047, 42.377];
} else if (window.innerWidth <= 770) {
  zoom = 8.4;
  center = [-71.039, 42.37];
}

const ppiMap = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ihill/ckb7xc2iq1sxf1ip9rdi5x0u6/',
  center,
  zoom,
  minZoom: 6,
  maxZoom: 13,
  maxBounds: [
    [-74.728, 38.167], // Southwest bound
    [-66.541, 46.032], // Northeast bound
  ]
});
ppiMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.map__legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.map__legend').style.maxHeight = "300px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})

const borderToggle = document.querySelector('.toggle__input--borders');
const roadToggle = document.querySelector('.toggle__input--roads')
borderToggle.addEventListener('click', () => {
  if (ppiMap.isStyleLoaded()) {
    ppiMap.setPaintProperty('mapc-borders', 'line-opacity', (borderToggle.checked ? 1 : 0));
  }
});

roadToggle.addEventListener('click', () => {
  if (ppiMap.isStyleLoaded()) {
    ppiMap.setPaintProperty('roads', 'line-opacity', (roadToggle.checked ? 1 : 0));
  }
})