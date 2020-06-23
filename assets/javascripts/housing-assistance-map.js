mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ihill/ckbcdolxk0dz91im5toqz9pre',
  center: [-71.566, 42.112],
  zoom: 7,
  minZoom: 6,
  maxZoom: 13,
  maxBounds: [
    [-74.728, 38.167], // Southwest bound
    [-66.541, 46.032], // Northeast bound
  ]
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

map.on('click', 'housing-assistance', (e) => {
  let tooltipHtml = `<p class='tooltip__title'>${toCamelCase(e.features[0].properties.muni)}</p>`;
  if (e.features[0].properties.total_Cost_assistance_regunemp) {
    tooltipHtml += `
      <ul class='tooltip__list'>
        <li class='tooltip__text'>$${d3.format(',')(Math.round(e.features[0].properties.total_Cost_assistance_regunemp))} in housing assistance need</li>
        <li class='tooltip__text'>${d3.format(',')(e.features[0].properties['Total Layoffs'])} unemployment claims</li>
        <li class='tooltip__text'>${d3.format(',')(Math.round(e.features[0].properties.total_hhds_impacted_assistance_regunemp))} households need assistance</li>
      </ul>
    `;
  } else {
    tooltipHtml += '<p class="tooltip__text">Data unavailable</p>'
  };

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(tooltipHtml)
    .setMaxWidth('300px')
    .addTo(map);
})

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

function toCamelCase(muniName) {
  return muniName.split(" ")
    .map((word) => word.charAt(0).concat(word.slice(1).toLowerCase()))
    .join(' ');
}