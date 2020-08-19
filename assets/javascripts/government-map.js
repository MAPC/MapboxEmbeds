d3.csv('/MapboxEmbeds/assets/data/government-1920.csv')
.then((response) => {
  console.log(response)
  let map = new mapboxgl.Map({
    container: 'map',
    zoom: 9.67,
    minZoom: 6,
    maxZoom: 13,
    center: [-71.0712, 42.3405],
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ],
    style: "mapbox://styles/ihill/ckd4s0ptt1byo1hrlkjyn5zvy",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  map.on('load', () => {
    const colorPalette = ["#edf8fb","#b2e2e2","#66c2a4","#238b45"];
    const policyBoardColor = (value) => {
      if (value === "Select Board") {
        return colorPalette[3]
      } else if (value === "Selectmen") {
        return colorPalette[2]
      } else if ("Council") {
        return colorPalette[1]
      }
    }
    const colorExpression = ['match', ['get', 'town']];

    response.forEach((row) => {
      colorExpression.push(row.TOWN, row['Policy Board'] !== '' ? policyBoardColor(row['Policy Board']) : 'grey')
    });
    colorExpression.push('grey');

    console.log(colorExpression)
    map.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': colorExpression,
        'fill-outline-color': 'black',
      }
    })
    map.moveLayer('MA muni borders')
    map.moveLayer('MAPC outline')
    map.moveLayer('settlement-major-label')
    map.moveLayer('settlement-minor-label')
  });
});
