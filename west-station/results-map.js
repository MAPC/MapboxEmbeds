const colors = ["#6e40aa","#df40a1","#ff704e","#d2c934","#6bf75c","#1bd9ac","#3988e1"];
const layerTypes = {
  'weststation-point': 'Point',
  'westation-line': 'Line',
  'weststation-polygon': 'Polygon',
};

mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';
let center = [-71.14231, 42.35887];
let zoom = 12; 
if (window.innerWidth <= 500) {
  zoom = 7.75;
  center = [-71.109, 42.356];
} else if (window.innerWidth <= 700) {
  zoom = 8.27;
  center = [-70.89, 42.369];
}

const resultsMap = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ihill/ckbr0gjxb2cwh1iplxlmt01bh',
  center,
  zoom,
  minZoom: 6,
  maxZoom: 13,
});

resultsMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

resultsMap.on('load', () => {
  resultsMap.on('click', function(e) {
    const clickedData = resultsMap.queryRenderedFeatures(
      [e.point.x, e.point.y],
      { layers: ['weststation-point', 'weststation-line', 'weststation-polygon'] },
    );
    const tooltipData = clickedData.map((point) => {
      let type = layerTypes[`${point.layer.id}`]
      return `
      <h2>${type}</h2>
      <ul>
        <li>Breakout room ${point.properties.breakout_room}</li>
        <li>Question ${point.properties.user__question}</li>
        <li>Title: ${point.properties.user__title}</li>
        <li>Notes: ${point.properties.user__notes}</li>
      </ul>
      `;
    })
    if (clickedData.length > 0) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(tooltipData)
        .addTo(resultsMap);
    }

  })
})

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.map__legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.map__legend').style.maxHeight = "360px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})

const pointToggle = document.querySelector('.toggle__input--point');
const lineToggle = document.querySelector('.toggle__input--line');
const polygonToggle = document.querySelector('.toggle__input--polygon');

pointToggle.addEventListener('click', () => {
  if (resultsMap.isStyleLoaded()) {
    resultsMap.setLayoutProperty('weststation-point', 'visibility', (pointToggle.checked ? 'visible' : 'none'));
  }
});

lineToggle.addEventListener('click', () => {
  if (resultsMap.isStyleLoaded()) {
    resultsMap.setLayoutProperty('weststation-line', 'visibility', (lineToggle.checked ? 'visible' : 'none'));
  }
})

polygonToggle.addEventListener('click', () => {
  if (resultsMap.isStyleLoaded()) {
    resultsMap.setLayoutProperty('weststation-polygon', 'visibility', (polygonToggle.checked ? 'visible' : 'none'));
  }
})