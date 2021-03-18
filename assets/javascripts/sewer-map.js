const colorScale = ['#3B66B0', '#FDB525', '#4FB965'];
const dataNa = '#B6B6B6';
let zoom = 9;
let center = [-71.0408, 42.3317];
if (window.innerWidth <= 500) {
  zoom = 7.75;
  center = [-71.109, 42.356];
} else if (window.innerWidth <= 700) {
  zoom = 8.27;
  center = [-70.89, 42.369];
}

d3.csv('/MapboxEmbeds/assets/data/WasteWater_System.csv')
.then((response) => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/ihill/ckmeybo3w0hse17pcxgsrd9g4",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
    center,
    zoom,
    minZoom: 8,
    maxZoom: 13,
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ]
  });

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  const choropleth = (value) => {
    if (value === 0) { // no centralized sewer lines, blue
      return colorScale[0]
    } if (value === 1) { // fully sewered, yellow
      return colorScale[1]
    } // Partially sewered, green
    return colorScale[2]
  }

  const sewerFlagFunc = (value) => {
    if (value === 0) {
      return 'No centralized sewer system(s)'
    } if (value === 1) {
      return 'Fully sewered, or nearly so'
    }
    return 'Partially sewered'
  }
  const sewerChoropleth = ['match', ['get', 'municipal']];
  const muniInfo = {};
  response.forEach((row) => {
    sewerChoropleth.push(row.municipal, row.sewer_flag ? choropleth(+row.sewer_flag) : dataNa);
    muniInfo[row.municipal] = sewerFlagFunc(+row.sewer_flag);
  });
  sewerChoropleth.push(dataNa);

    map.on('load', () => {
      map.resize();
      map.addSource('MAPC Municipalities', {
        type: 'vector',
        url: 'mapbox://ihill.763lks2o'
      })
      map.addSource('Sewer Lines', {
        type: 'vector',
        url: 'mapbox://ihill.5wqorrqo'
      })

      map.addLayer({
        id: 'MAPC Municipalities layer',
        type: 'fill',
        source: 'MAPC Municipalities',
        'source-layer': 'MAPC_borders-0im3ea',
        paint: { 'fill-color': sewerChoropleth, 'fill-outline-color': '#FFFFFF' }
      })
      map.addLayer({
        id: 'MAPC Sewer Lines',
        source: 'Sewer Lines',
        'source-layer': 'MAPCSewerLines2013-9tfyjn',
        type: 'line'
      })

      map.on('click', (e) => {
        const clickedData = map.queryRenderedFeatures([e.point.x, e.point.y], { layers: ['MAPC Municipalities layer'] });
        if (clickedData.length > 0) {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <p class="tooltip__title tooltip__title--datacommon">${clickedData[0].properties.municipal}</p>
              <p class="tooltip__text tooltip__text--datacommon">${muniInfo[clickedData[0].properties.municipal]}<p>
            `)
            .addTo(map);
        }
      });
    })
})

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
});

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "340px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
});
