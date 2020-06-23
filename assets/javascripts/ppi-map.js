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
  ],
});
ppiMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

// document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
//   document.querySelector('.map__legend').style.maxHeight = "0";
//   document.querySelector('.maximize-instructions').style.display = 'inline';
//   document.querySelector('.button__collapsible--plus').style.display = 'inline';
//   document.querySelector('.button__collapsible--minus').style.display = 'none';
// })

// document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
//   document.querySelector('.map__legend').style.maxHeight = "360px";
//   document.querySelector('.maximize-instructions').style.display = 'none';
//   document.querySelector('.button__collapsible--minus').style.display = 'inline';
//   document.querySelector('.button__collapsible--plus').style.display = 'none';
// })

// const borderToggle = document.querySelector('.toggle__input--borders');
// const roadToggle = document.querySelector('.toggle__input--roads')
// borderToggle.addEventListener('click', () => {
//   if (ppiMap.isStyleLoaded()) {
//     ppiMap.setPaintProperty('mapc-borders', 'line-opacity', (borderToggle.checked ? 1 : 0));
//   }
// });

// roadToggle.addEventListener('click', () => {
//   if (ppiMap.isStyleLoaded()) {
//     ppiMap.setPaintProperty('roads', 'line-opacity', (roadToggle.checked ? 1 : 0));
//   }
// })