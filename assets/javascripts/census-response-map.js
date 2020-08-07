const colors = ["#feedde","#fdbe85","#fd8d3c","#e6550d", "#a63603", '#636363']

d3.json('/MapboxEmbeds/assets/data/census-september.json')
  .then((response) => {
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
      zoom,
      minZoom: 6,
      maxZoom: 13,
      center,
      style: "mapbox://styles/ihill/ck7qhmh0715wv1ilds1q8cb4z",
      accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
    });
    response.shift()
    const responseWithTitles = response.map(row => {
      return {
        "GEO_ID": row['0'],
        "NAME": row['1'],
        "CRRALL": row['2'],
        "DRRALL": row['3'],
        "CRRINT": row['4'],
        "DRRINT": row['5'],
        "RESP_DATE": row['6'],
        "state": row['7'],
        "county": row['8'],
        "tract": row['9']
      }
    })
    const colorScale = (value) => {
      if (value >= 80) {
        return colors[0];
      } if (value >= 70) {
        return colors[1];
      } if (value >= 60) {
        return colors[2];
      } if (value >= 50) {
        return colors[3];
      }
      return colors[4];
    };
    
    const choropleth = ['match', ['get', 'ct10_id']];
    const responseRates = {};
    responseWithTitles.forEach((row) => {
      let fullTractId = row.state + row.county + row.tract
      responseRates[fullTractId] = row;
      choropleth.push(fullTractId, colorScale(+row.CRRALL));
    });

    choropleth.push(colors[5]);
    map.on('load', () => {
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      map.setPaintProperty('background', 'background-color', '#F0F8F3');
      map.setPaintProperty('Non MAPC municipalities', 'fill-color', '#F0F8F3');
      map.setPaintProperty('External State', 'fill-color', '#F0F8F3');
      map.setPaintProperty('MAPC municipal borders', 'line-width', 1);
      map.addLayer({
        id: 'Response Rate by Tract',
        type: 'fill',
        source: 'composite',
        'source-layer': 'Tracts-2jsl06',
        paint: {
          'fill-color': choropleth
        },
      });
      map.moveLayer('MAPC municipal borders');

      map.on('click', 'Response Rate by Tract', (e) => {
        const clickedData = map.queryRenderedFeatures(
          [e.point.x, e.point.y],
          { layers: ['Response Rate by Tract', 'MAPC municipalities',] },
        );
        if (responseRates[`${e.features[0].properties.ct10_id}`]) {
          new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            <p class="tooltip__title tooltip__title--datacommon">Tract ${clickedData[0].properties.ct10_id} (${clickedData[1].properties.municipal})</p>
            <ul class='tooltip__list'>
            <li class="tooltip__text tooltip__text--datacommon">Response rate: ${responseRates[`${clickedData[0].properties.ct10_id}`].CRRALL}%</li>
            <li class="tooltip__text tooltip__text--datacommon">Internet response rate: ${responseRates[`${clickedData[0].properties.ct10_id}`].CRRINT}%</li>
            </ul>
          `)
          .addTo(map);
        } else {
          new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            <p class="tooltip__title tooltip__title--datacommon">Tract ${clickedData[0].properties.ct10_id} (${clickedData[1].properties.municipal})</p>
            <p class="tooltip__text tooltip__text--datacommon">Response rate data unavailable</p>
          `)
          .addTo(map);
        }
      });
  });
});

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "188px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})
