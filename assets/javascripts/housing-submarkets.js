const choroplethColors = ['#F2F0F7', '#DADAEB', '#BCBDDC', '#9E9AC8', '#807DBA', '#6A51A3', '#4A1486'];
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

const choropleths = {
  medhv: (value) => {
    if (value <= 300000) {
      return choroplethColors[0];
    } if (value <= 450000) {
      return choroplethColors[1];
    } if (value <= 600000) {
      return choroplethColors[2];
    } if (value <= 750000) {
      return choroplethColors[3];
    } if (value <= 900000) {
      return choroplethColors[4];
    } if (value <= 1050000) {
      return choroplethColors[5];
    }
    return choroplethColors[6];
  },
  'rhu_p': (value) => {
    if (value <= 20) {
      return choroplethColors[2];
    } if (value <= 40) {
      return choroplethColors[3];
    } if (value <= 60) {
      return choroplethColors[4];
    } if (value <= 80) {
      return choroplethColors[5];
    }
    return choroplethColors[6];
  },
  'yrblt59_p': (value) => {
    if (value <= 20) {
      return choroplethColors[2];
    } if (value <= 40) {
      return choroplethColors[3];
    } if (value <= 60) {
      return choroplethColors[4];
    } if (value <= 80) {
      return choroplethColors[5];
    }
    return choroplethColors[6];
  },
  'cash17_p': (value) => {
    if (value <= 15) {
      return choroplethColors[1];
    } if (value <= 30) {
      return choroplethColors[2];
    } if (value <= 45) {
      return choroplethColors[3];
    } if (value <= 60) {
      return choroplethColors[4];
    } if (value <= 75) {
      return choroplethColors[5];
    }
    return choroplethColors[6];
  },
  'ch_medhv_p': (value) => {
    if (value <= 20) {
      return choroplethColors[2];
    } if (value <= 40) {
      return choroplethColors[3];
    } if (value <= 60) {
      return choroplethColors[4];
    } if (value <= 80) {
      return choroplethColors[5];
    }
    return choroplethColors[6];
  },
};

d3.csv('/MapboxEmbeds/assets/data/housing_submarkets.csv')
.then((response) => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/ihill/ckjn5vkva2jbv19oxvi39hc66",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
    center,
    zoom,
    minZoom: 6,
    maxZoom: 13,
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ]
  });

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  const medhvColorExpression = ['match', ['get', 'ct10_id']];
  const rhuColorExpression = ['match', ['get', 'ct10_id']];
  const yrbltColorExpression = ['match', ['get', 'ct10_id']];
  const cashColorExpression = ['match', ['get', 'ct10_id']];
  const chMedhvColorExpression = ['match', ['get', 'ct10_id']];
  const tractInfo = {};
    response.forEach((row) => {
      medhvColorExpression.push(row.ct10_id, row.medhv ? choropleths.medhv(+row.medhv) : dataNa);
      rhuColorExpression.push(row.ct10_id, row.rhu_p ? choropleths['rhu_p'](+row.rhu_p) : dataNa);
      yrbltColorExpression.push(row.ct10_id, row.yrblt59_p ? choropleths['yrblt59_p'](+row.yrblt59_p) : dataNa);
      cashColorExpression.push(row.ct10_id, row.cash17_p ? choropleths['cash17_p'](+row.cash17_p) : dataNa);
      chMedhvColorExpression.push(row.ct10_id, row.ch_medhv_p ? choropleths['ch_medhv_p'](+row.ch_medhv_p) : dataNa);
      tractInfo[`${row.ct10_id}`] = row;
    });
    medhvColorExpression.push(dataNa);
    rhuColorExpression.push(dataNa);
    yrbltColorExpression.push(dataNa);
    cashColorExpression.push(dataNa);
    chMedhvColorExpression.push(dataNa);

    map.on('load', () => {
      map.addLayer({
        id: 'Tract choropleth',
        type: 'fill',
        source: 'composite',
        'source-layer': 'Tracts-2jsl06',
        paint: { 'fill-color': medhvColorExpression, 'fill-outline-color': '#707070' }
      })
      map.addLayer({
        id: 'Muni borders - polygon',
        type: 'fill',
        source: 'composite',
        'source-layer': 'MAPC_borders-0im3ea',
        paint: { 'fill-color': 'rgba(0, 0, 0, 0)' }
      })

      map.addLayer({
        id: 'Muni borders - lines',
        type: 'line',
        source: 'composite',
        'source-layer': 'MAPC_borders-0im3ea',
      })

      map.on('click', (e) => {
        const clickedData = map.queryRenderedFeatures(
          [e.point.x, e.point.y],
          { layers: ['Tract choropleth', 'Muni borders - polygon'] },
        );

        if (clickedData.length === 2) {
          const title = `
          <p class="tooltip__title tooltip__title--datacommon">Tract ${clickedData[1].properties.ct10_id} (${clickedData[0].properties.municipal})</p>
        `;
          const selectedTract = tractInfo[clickedData[1].properties.ct10_id];

          const body = selectedTract ?
          `<ul class='tooltip__list'>
            <li class='tooltip__text tooltip__text--datacommon'>${d3.format('$,')(selectedTract.medhv)} median home value</li>
            <li class='tooltip__text tooltip__text--datacommon'>${selectedTract.rhu_p}% renter households</li>
            <li class='tooltip__text tooltip__text--datacommon'>${selectedTract.yrblt59_p}% year built prior to 1960</li>
            <li class='tooltip__text tooltip__text--datacommon'>${selectedTract.cash17_p}% cash sales</li>
            <li class='tooltip__text tooltip__text--datacommon'>${selectedTract.ch_medhv_p}% change in median home value</li>
          </ul>`
            : `<p class="tooltip__text tooltip__text--datacommon">Tract data unavailable<p>`;
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(title + body)
            .addTo(map);
        }
      });

      document.querySelector('#type').addEventListener("change", (e) => {
        switch(e.target.value) {
          case 'medhv':
            map.setPaintProperty('Tract choropleth', 'fill-color', medhvColorExpression)
            document.querySelector('#legend__medhv').style.display ="inline";
            document.querySelector('#legend__rhu_p').style.display ="none";
            document.querySelector('#legend__yrblt59_p').style.display ="none";
            document.querySelector('#legend__cash17_p').style.display ="none";
            document.querySelector('#legend__ch_medhv_p').style.display ="none";
            break;
          case 'rhu_p':
            map.setPaintProperty('Tract choropleth', 'fill-color', rhuColorExpression)
            document.querySelector('#legend__medhv').style.display ="none"
            document.querySelector('#legend__rhu_p').style.display ="inline";
            document.querySelector('#legend__yrblt59_p').style.display ="none";
            document.querySelector('#legend__cash17_p').style.display ="none";
            document.querySelector('#legend__ch_medhv_p').style.display ="none";
            break;
          case 'yrblt59_p':
            map.setPaintProperty('Tract choropleth', 'fill-color', yrbltColorExpression)
            document.querySelector('#legend__medhv').style.display ="none"
            document.querySelector('#legend__rhu_p').style.display ="none";
            document.querySelector('#legend__yrblt59_p').style.display ="inline";
            document.querySelector('#legend__cash17_p').style.display ="none";
            document.querySelector('#legend__ch_medhv_p').style.display ="none";
            break;
          case 'cash17_p':
            map.setPaintProperty('Tract choropleth', 'fill-color', cashColorExpression)
            document.querySelector('#legend__medhv').style.display ="none"
            document.querySelector('#legend__rhu_p').style.display ="none";
            document.querySelector('#legend__yrblt59_p').style.display ="none";
            document.querySelector('#legend__cash17_p').style.display ="inline";
            document.querySelector('#legend__ch_medhv_p').style.display ="none";
            break;
          case 'ch_medhv_p':
            map.setPaintProperty('Tract choropleth', 'fill-color', chMedhvColorExpression)
            document.querySelector('#legend__medhv').style.display ="none"
            document.querySelector('#legend__rhu_p').style.display ="none";
            document.querySelector('#legend__yrblt59_p').style.display ="none";
            document.querySelector('#legend__cash17_p').style.display ="none";
            document.querySelector('#legend__ch_medhv_p').style.display ="inline";
            break;
        }
      })
    })
})

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
});

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "300px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
});
