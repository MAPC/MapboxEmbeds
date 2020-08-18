mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';
d3.csv('/MapboxEmbeds/assets/data/0718_housing_assistance.csv').then((response) => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ihill/ckdyniqrf00bc19pioqescksy/draft',
    center: [-71.566, 42.112],
    zoom: 7,
    minZoom: 6,
    maxZoom: 13,
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ]
  });
  const colorPalette = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#0c2c84", "#e8e8e8"]
  const colorExpression = ['match', ['get', 'muni']];
  const housingAssistanceObj = {};
  const unemploymentObj = {};
  const householdsObj = {};
  response.forEach((row) => {
    housingAssistanceObj[row.muni] = row.total_Cost_assistance_regunemp;
    unemploymentObj[row.muni] = row['Total Layoffs'];
    householdsObj[row.muni] = row.total_hhds_impacted_assistance_regunemp;
  });

  map.on('load', () => {
    // [
    //     "#ffffd9",
    //     10001,
    //     "#edf8b1",
    //     50001,
    //     "#c7e9b4",
    //     100001,
    //     "#7fcdbb",
    //     250001,
    //     "#41b6c4",
    //     500001,
    //     "#1d91c0",
    //     1000001,
    //     "#225ea8",
    //     3500001,
    //     "#0c2c84"
    //   ],
    //   "#e8e8e8"
    // ]
    const colorPolygon = (value) => {
      if (value >= 3500001) {
        return colorPalette[4]
      } else if (value >= 1000001) {
        return colorPalette[3]
      } else if (value >= 500001) {
        return colorPalette[2]
      } else if (value >= 100001) {
        return colorPalette[1]
      }
      return colorPalette[0]
    }

    response.forEach((row) => {
      colorExpression.push(row.muni, row.total_Cost_assistance_regunemp != '-' ? colorPolygon(row.total_Cost_assistance_regunemp) : colorPalette[8])
    });
    colorExpression.push('#B57F00');
    console.log(map.getStyle().layers)
    map.addLayer({
      id: 'Updated Housing Assistance',
      type: 'fill',
      source: 'composite',
      'source-layer': 'CovidHousingAssistance',
      paint: {
        'fill-color': colorExpression,
      },
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
  })
})

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "330px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})

function toCamelCase(muniName) {
  return muniName.split(" ")
    .map((word) => word.charAt(0).concat(word.slice(1).toLowerCase()))
    .join(' ');
}