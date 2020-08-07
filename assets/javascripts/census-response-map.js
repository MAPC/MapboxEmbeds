const colors = ['#F15B52', '#F37871', '#F8B4B0', '#FBD2CF', '#F0EFE7'];

fetch('https://api.census.gov/data/2020/dec/responserate?get=GEO_ID,NAME,CRRALL,DRRALL,CRRINT,DRRINT,RESP_DATE&for=tract:*&in=state:25&key=ENTERKEY')
  .then(response => response.json())
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
      if (isNaN(value)) {
        return colors[4];
      } if (value >= 90) {
        return colors[0];
      } if (value >= 75) {
        return colors[1];
      } if (value >= 50) {
        return colors[2];
      }
      return colors[3];
    };

    const choropleth = ['match', ['get', 'ct10_id']];
    const responseRates = {};
    responseWithTitles.forEach((row) => {
      choropleth.push(row.GEO_ID.slice(-11), colorScale(+row.CRRALL));
      responseRates[row.GEO_ID.slice(-11)] = +row.CRRALL;
    });
    choropleth.push(colors[4]);
    map.on('load', () => {
      map.setPaintProperty('background', 'background-color', '#C4E7EB');
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
      
      map.on('click', 'Response Rate by Tract', (e) => {
        console.log(e.features[0].properties)
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            Tract ${e.features[0].properties.ct10_id}
            <br/> Response rate: ${responseRates[`${e.features[0].properties.ct10_id}`]}
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
