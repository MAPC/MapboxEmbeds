d3.csv('/MapboxEmbeds/assets/data/b25041_bedrooms_per_unit_ct.csv')
.then((response) => {
  let map = new mapboxgl.Map({
    container: 'map',
    zoom: 8,
    minZoom: 6,
    maxZoom: 13,
    center: [-70.986, 42.413],
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ],
    style: "mapbox://styles/ihill/ck5sc5wql2ezb1imqyu8a1miu",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });
  const colorPalette = ['#0097c4', '#3b66b0', '#233069', '#111436'];
  const percentagesObj = {};
  const moeObj = {};
  const totalsObj = {};
  response.forEach((row) => {
    percentagesObj[row.bg10_id] = row.bd3u_pct_e;
    moeObj[row.bg10_id] = row.bd3u_pct_m;
    totalsObj[row.bg10_id] = row.total_e;
  });

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  map.on('load', () => {
    map.resize();


    const colorPolygon = d3.scaleQuantize()
      .domain([0,1])
      .range(colorPalette);
    const colorExpression = ['match', ['get', 'ct10_id']];
    const patternExpression = ['match', ['get', 'ct10_id']];
    response.forEach((row) => {
      colorExpression.push(row.bg10_id, row.bd3u_pct_e !== 'NA' ? colorPolygon(+row.bd3u_pct_e) : '#B57F00')
      patternExpression.push(row.bg10_id, (+row.bd3u_pct_m >= 30 && row.bd3u_pct_m !== 'NA' && row.bd3u_pct_e !== 'NA') ? 'Pattern_Hatching_Gray' : 'new-blank')
    });
    colorExpression.push('#B57F00');
    patternExpression.push('new-blank')
    map.addLayer({
      id: 'tracts-choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'Tracts-2jsl06',
      paint: {
        'fill-color': colorExpression,
      },
    });

    map.loadImage('/MapboxEmbeds/assets/images/blank-square.png', function (err, image) {
      if (err) throw err;
      map.addImage('new-blank', image)

      map.addLayer({
        id: 'tracts-pattern',
        type: 'fill',
        source: 'composite',
        'source-layer': 'Tracts-2jsl06',
        paint: {
          'fill-pattern': patternExpression,
        },
      });

      map.moveLayer('tracts-choropleth', 'MAPC municipal borders');
      map.moveLayer('tracts-pattern', 'MAPC municipal borders');
    })

  });


  map.on('click', 'MAPC tracts', (e) => {
    const clickedData = map.queryRenderedFeatures(
      [e.point.x, e.point.y],
      { layers: ['MAPC tracts', 'MAPC municipalities', 'tracts-choropleth'] },
    );
    const tractId = clickedData[0].properties.ct10_id;
    const percentageUnits = percentagesObj[tractId] <= 1 ? `${d3.format('.1%')(percentagesObj[tractId])}` : 'Data unavailable';
    const tooltipText = `<p class='tooltip__title'>Tract ${tractId} `
    + `(${clickedData[2].properties.municipal})</p>`
    + `<p class='tooltip__text'>${percentageUnits} of ${d3.format(',')(totalsObj[tractId])} total units</p>`;
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(tooltipText)
      .addTo(map);
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
