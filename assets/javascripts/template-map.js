// d3 csv or json is, I have found, the easiest way to bring in data to match onto the map. You can save datasets in the /assets/data folder

// d3.csv('https://raw.githubusercontent.com/MAPC/paycheck-protection-program-ma/master/PPP-202-join.csv')
d3.json('/MapboxEmbeds/assets/data/ppp-august2020-min.json')
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
  let map = new mapboxgl.Map({
    container: 'map',
    zoom,
    minZoom: 6,
    maxZoom: 13,
    center,
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ],
    style: "mapbox://styles/ihill/ckd4s0ptt1byo1hrlkjyn5zvy",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });
  const colorPalette = ["#edf8fb","#b2e2e2","#66c2a4","#238b45"];

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  map.on('load', () => {
    map.resize(); // Sometimes the map displays smaller than it should; this is a hacky way of resetting it that has worked for us so far
    document.querySelector('.legend__wrapper').style.display = 'unset'; // Display legend on load

    // To create a choropleth, you need to match on some property of the geometries (often 'town' or 'municipal', but tract-level data is often labelled 'ct_10')
    // Create a function that assigns colors to value bands

    const muniColor = (value) => {
      if (value >= .75) {
        return colorPalette[3]
      } else if (value >= .50) {
        return colorPalette[2]
      } else if (value >= .25) {
        return colorPalette[1]
      } else if (value >= 0) {
        return colorPalette[0]
      }
    }

    // Choropleth style is an array of strings and/or integers + colors. Go through each row of you data, match on the geography key (municipality, tract, etc)
    // and push that row's value through the color function. Set a default color in case there is no match, and then push that value as the final entry
    // in the array
    const muniColorExpression = ['match', ['get', 'town']];

    response.forEach((row) => {
      muniColorExpression.push(row.muni, (+row.totalLoans && +row.establishments) ? muniColor((+row.totalLoans)/ (+row.establishments)) : '#bfbeba')
    })
    muniColorExpression.push('#bfbeba');

    // Add styled choropleth via
    map.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': muniColorExpression,
        'fill-outline-color': 'black',
      }
    })

    // Optional: add and re-arrange map layers
    map.moveLayer('MA muni borders')
    map.moveLayer('MAPC outline')
    map.moveLayer('settlement-major-label')
    map.moveLayer('settlement-minor-label')

    // On clicking choropleth layer, display a popup
    map.on('click', 'Muni choropleth', function(e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`
          <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.town}</p>
          <ul class='tooltip__list'>
          <li class="tooltip__text tooltip__text--datacommon">List item (can include Javascript objects as template literals}</li>
          </ul>
        `)
        .addTo(map);
    })
  });
})


document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "345px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})
