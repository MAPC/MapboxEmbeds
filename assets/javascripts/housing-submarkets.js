const choroplethColors = ['#F2F0F7', '#DADAEB', '#BCBDDC', '#9E9AC8', '#807DBA', '#6A51A3', '#4A1486'];
const dataNa = 'gray';

const choropleths = {
  mhi: (value) => {
    if (value <= 35000) {
      return choroplethColors[6];
    } if (value <= 50000) {
      return choroplethColors[5];
    } if (value <= 75000) {
      return choroplethColors[4];
    } if (value <= 100000) {
      return choroplethColors[3];
    } if (value <= 150000) {
      return choroplethColors[2];
    } if (value <= 200000) {
      return choroplethColors[1];
    }
    return choroplethColors[0];
  },
  'ch_rhu_p': (value) => {
    if (value <= -100) {
      return choroplethColors[6];
    } if (value <= -25) {
      return choroplethColors[5];
    } if (value <= 25) {
      return choroplethColors[4];
    } if (value <= 50) {
      return choroplethColors[3];
    } if (value <= 100) {
      return choroplethColors[2];
    } if (value <= 200) {
      return choroplethColors[1];
    }
    return choroplethColors[0];
  }
};

d3.csv('/MapboxEmbeds/assets/data/housing_submarkets.csv')
.then((response) => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/ihill/ckjn5vkva2jbv19oxvi39hc66",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
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

  const mhiColorExpression = ['match', ['get', 'ct10_id']];
  const rhuColorExpression = ['match', ['get', 'ct10_id']];
    response.forEach((row) => {
      mhiColorExpression.push(row.ct10_id, row.mhi ? choropleths.mhi(+row.mhi) : gray);
      rhuColorExpression.push(row.ct10_id, row.ch_rhu_p ? choropleths['ch_rhu_p'](+row.ch_rhu_p) : gray);
    });
    mhiColorExpression.push(dataNa);
    rhuColorExpression.push(dataNa);

    map.on('load', () => {
      map.addLayer({
        id: 'Tract choropleth',
        type: 'fill',
        source: 'composite',
        'source-layer': 'Tracts-2jsl06',
        paint: { 'fill-color': mhiColorExpression, 'fill-outline-color': '#707070' }
      })
      map.addLayer({
        id: 'Muni borders',
        type: 'line',
        source: 'composite',
        'source-layer': 'MAPC_borders-0im3ea',
      })
      document.querySelector('#type').addEventListener("change", (e) => {
        switch(e.target.value) {
          case 'mhi':
            map.setPaintProperty('Tract choropleth', 'fill-color', mhiColorExpression)
            break;
          case 'ch_rhu_p':
            map.setPaintProperty('Tract choropleth', 'fill-color', rhuColorExpression)
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
