d3.csv('/MapboxEmbeds/assets/data/broadband_data.csv').then((response) => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/ihill/ckcnnn63u26o11ip2qf4odwyp",
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
  const colorPalette = ['#F3F3F3', '#B1C6D8', '#50789D', '#2e4b66', '#c1b9bb'];
  const colorExpression = ['match', ['get', 'town']];
  const medianObj = {};
  response.forEach((row) => {
    medianObj[row.muni] = row.median_download_speed_mbps_2020;
  });

  const colorPolygon = (value) => {
    if (value >= 200) {
      return colorPalette[3]
    } else if (value >= 100) {
      return colorPalette[2]
    } else if (value >= 50) {
      return colorPalette[1]
    }
    return colorPalette[0]
  }

  response.forEach((row) => {
    colorExpression.push(row.muni, row.median_download_speed_mbps_2020 != '-' ? colorPolygon(+row.median_download_speed_mbps_2020) : colorPalette[4])
  });
  colorExpression.push(colorPalette[4]);

  map.on('load', () => {
    map.setPaintProperty('background', 'background-color', '#E5E5E5');
    map.setPaintProperty('External State', 'fill-color', '#E5E5E5');

    map.addLayer({
      id: 'Median Download Speed',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': colorExpression,
      }
    })
    map.moveLayer('Muni borders')
    map.moveLayer('MAPC outline')

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.on('click', 'Median Download Speed', (e) => {
      console.log(e.features[0].properties)
      // let tooltipHtml = `<p class='tooltip__title'>${toCamelCase(e.features[0].properties.muni)}</p>`;
      // let housingAssistance = housingAssistanceObj[`${e.features[0].properties.muni}`];
      // let unemployment = unemploymentObj[`${e.features[0].properties.muni}`];
      // let households = householdsObj[`${e.features[0].properties.muni}`];
      // if (housingAssistance !== "-") {
      //   tooltipHtml += `
      //     <ul class='tooltip__list'>
      //       <li class='tooltip__text'>$${d3.format(',')(Math.round(housingAssistance))} in housing assistance need</li>
      //       <li class='tooltip__text'>${d3.format(',')(unemployment)} unemployment claims</li>
      //       <li class='tooltip__text'>${d3.format(',')(Math.round(households))} households need assistance</li>
      //     </ul>
      //   `;
      // } else {
      //   tooltipHtml += '<p class="tooltip__text">Data unavailable</p>'
      // };

      // new mapboxgl.Popup()
      //   .setLngLat(e.lngLat)
      //   .setHTML(tooltipHtml)
      //   .setMaxWidth('300px')
      //   .addTo(map);
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