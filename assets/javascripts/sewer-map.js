const colorScale = ['#FDB525', '#0097C4', '#92C9ED', '#4FB965']
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
  const choropleth = (value, ww_provider) => {
    if (value === 0) { // no centralized sewer lines, blue
      return colorScale[0]
    } if (value === 1 && ww_provider !== 'MWRA') { // fully sewered, MWRA, yellow
      return colorScale[1]
    } if (value === 1 && ww_provider === 'MWRA') { // fully sewered, not MWRA, red
      return colorScale[2]
    }
    // Partially sewered, green
    return colorScale[3]
  }

  const iconChoropleth = (value) => {
    if (value === 0) {
      return 'dot-11-white'
    }
    return 'new-blank'
  }

  const sewerFlagFunc = (value, ww_provider) => {
    if (value === 0) {
      return 'No centralized sewer system(s)'
    } if (value === 1 && ww_provider === 'MWRA') {
      return 'Fully sewered, or nearly so (provided by MWRA)'
    } if (value === 1 && ww_provider !== 'MWRA') {
      return 'Fully sewered, or nearly so (not provided by MWRA)'
    }
    return 'Partially sewered'
  }

  const sewerChoropleth = ['match', ['get', 'municipal']];
  const dataChoropleth = ['match', ['get', 'municipal']];
  const muniInfo = {};
  response.forEach((row) => {
    sewerChoropleth.push(row.municipal, row.sewer_flag ? choropleth(+row.sewer_flag, row['WW provider']) : dataNa);
    dataChoropleth.push(row.municipal, row.Data_flag ? iconChoropleth(+row.Data_flag) : 'new-blank')
    muniInfo[row.municipal] = sewerFlagFunc(+row.sewer_flag, row['WW provider']);
  });
  sewerChoropleth.push(dataNa);
  dataChoropleth.push('new-blank')

    map.on('load', () => {
      map.resize();
      map.addSource('MAPC Municipalities', {
        type: 'vector',
        url: 'mapbox://ihill.763lks2o'
      })

      map.addSource('Sewer Lines', {
        type: 'vector',
        tiles: ['https://tiles.arcgis.com/tiles/c5WwApDsDjRhIVkH/arcgis/rest/services/Sewer_Lines/VectorTileServer/tile/{z}/{y}/{x}.pbf'],
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
        'source-layer': "Sewer Lines",
        type: 'line',
        paint: { 'line-color': '#231F20', 'line-width': .25 }
      })

      map.addLayer({
        id: 'MAPC Muni Data layer',
        type: 'fill',
        source: 'MAPC Municipalities',
        'source-layer': 'MAPC_borders-0im3ea',
        paint: { 'fill-pattern': dataChoropleth }
      })

      map.on('click', (e) => {
        const clickedData = map.queryRenderedFeatures([e.point.x, e.point.y], { layers: ['MAPC Municipalities layer'] });
        if (clickedData.length > 0) {
          let tooltipHtml = `
            <p class="tooltip__title tooltip__title--datacommon">${clickedData[0].properties.municipal}</p>
            <p class="tooltip__text tooltip__text--datacommon">${muniInfo[clickedData[0].properties.municipal]}<p>
          `
          if (clickedData[0].properties.municipal === 'Hingham') {
            tooltipHtml += `
              <br />
              <p class="tooltip__text tooltip__text--datacommon">
                <em>
                  Note: Hingham has two separate sewer districts, the larger of which is served by the MWRA. <a href="https://www.hingham-ma.gov/226/Sewer-Commission" target="_parent">Learn more</a>
                </em>
              </p>
            `
          }
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(tooltipHtml)
            .addTo(map);
        }
      });

      map.loadImage(
        '/MapboxEmbeds/assets/images/baseline_grade_black_18dp.png',
        function (error, image) {
        if (error) throw error;
        map.addImage('star', image);
        map.addSource('point', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-70.9578286, 42.3513861]
              }
            }]
          }
        });
        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'point',
          'layout': {
            'icon-image': 'star',
          }
        });
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
