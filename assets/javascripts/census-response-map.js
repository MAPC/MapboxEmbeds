const colors = ["#feedde","#fdbe85","#fd8d3c","#e6550d", "#a63603", '#636363']

d3.json('/MapboxEmbeds/assets/data/census-september.json')
  .then((response) => {
    const map = new mapboxgl.Map({
      container: 'map',
      zoom: 8,
      minZoom: 6,
      maxZoom: 13,
      center: [-70.986, 42.413],
      maxBounds: [
        [-74.728, 38.167], // Southwest bound
        [-66.541, 46.032], // Northeast bound
      ],
      style: "mapbox://styles/ihill/ck7qhmh0715wv1ilds1q8cb4z",
      accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
    });
    response.shift()
    console.log(response)
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
      console.log(map.getStyle())
      map.setPaintProperty('background', 'background-color', '#C4E7EB');
      map.setPaintProperty('Non MAPC municipalities', 'fill-color', '#bf812d');
      map.setPaintProperty('External State', 'fill-color', '#bf812d');
      map.setPaintProperty('MAPC municipal borders', 'line-width', 1);
      map.addLayer({
        id: 'Response Rate by Tract',
        type: 'fill',
        source: 'composite',
        'source-layer': 'Tracts-2jsl06',
        paint: {
          'fill-color': choropleth,
          'fill-outline-color': 'black',
        },
      });
      map.moveLayer('MAPC municipal borders');

      map.on('click', 'Response Rate by Tract', (e) => {
        console.log(e.features[0].properties.ct10_id)
        console.log(responseRates[`${e.features[0].properties.ct10_id}`])
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            Tract ${e.features[0].properties.ct10_id}
            <br/> Response rate: ${responseRates[`${e.features[0].properties.ct10_id}`].CRRALL}
          `)
          .addTo(map);
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
