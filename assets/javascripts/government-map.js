Promise.all([
  d3.csv('/MapboxEmbeds/assets/data/government-1920.csv'),
  d3.csv('/MapboxEmbeds/assets/data/government-1819.csv')
])
.then((response) => {
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
    style: "mapbox://styles/ihill/ckcnnn63u26o11ip2qf4odwyp",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  const governmentInfo = {
    "2019": {},
    "2018": {}
  };
  const colorPalette = ["#92C9ED","#3B66B0","#233069", "#111436"];
  const policyBoardColor = (value) => {
    if (value === "Selectmen") {
      return colorPalette[0]
    } else if (value === "Select Board") {
      return colorPalette[1]
    } else if (value ===  "Council") {
      return colorPalette[2]
    }
  };
  const legislativeColor = (value) => {
    if (value === "Open Town Meeting") {
      return colorPalette[0]
    } else if (value === "Council") {
      return colorPalette[1]
    } else if (value === "Representative Town Meeting") {
      return colorPalette[2]
    } else if (value === "Aldermen") {
      return colorPalette[3]
    }
  };
  const cmoColor = (value) => {
    if (value === "Town Administrator") {
      return colorPalette[0]
    } else if (value === "Town Manager") {
      return colorPalette[1]
    } else if (value === "Mayor") {
      return colorPalette[2]
    } else {
      return colorPalette[3]
    } 
  };
  const policyColorExpression19 = ['match', ['get', 'town']];
  const legislativeColorExpression19 = ['match', ['get', 'town']];
  const cmoColorExpression19 = ['match', ['get', 'town']];
  const policyColorExpression18 = ['match', ['get', 'town']];
  const legislativeColorExpression18 = ['match', ['get', 'town']];
  const cmoColorExpression18 = ['match', ['get', 'town']];
  
  response[0].forEach((row) => {
    governmentInfo["2019"][`${row.TOWN}`] = row
    policyColorExpression19.push(row.TOWN, row['Policy Board'] !== '' ? policyBoardColor(row['Policy Board']) : '#D1D6D6')
    legislativeColorExpression19.push(row.TOWN, row['Legislative Body'] !== '' ? legislativeColor(row['Legislative Body']) : '#D1D6D6')
    cmoColorExpression19.push(row.TOWN, row['Chief Municipal Official'] !== '' ? cmoColor(row['Chief Municipal Official']) : '#D1D6D6')
  });

  response[1].forEach((row) => {
    governmentInfo["2018"][`${row.TOWN}`] = row
    policyColorExpression18.push(row.TOWN, row['Policy Board'] !== '' ? policyBoardColor(row['Policy Board']) : '#D1D6D6')
    legislativeColorExpression18.push(row.TOWN, row['Legislative Body'] !== '' ? legislativeColor(row['Legislative Body']) : '#D1D6D6')
    cmoColorExpression18.push(row.TOWN, row['Chief Municipal Official'] !== '' ? cmoColor(row['Chief Municipal Official']) : '#D1D6D6')
  });

  policyColorExpression19.push('#D1D6D6');
  legislativeColorExpression19.push('#D1D6D6');
  cmoColorExpression19.push('#D1D6D6');
  policyColorExpression18.push('#D1D6D6');
  legislativeColorExpression18.push('#D1D6D6');
  cmoColorExpression18.push('#D1D6D6');

  map.on('load', () => {
    document.querySelector('.legend__wrapper').style.display = 'unset';
    map.setPaintProperty('background', 'background-color', '#F2F5FB');
    map.setPaintProperty('External State', 'fill-color', '#F2F5FB');
    map.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': policyColorExpression19,
        'fill-outline-color': 'black',
      }
    })
    map.moveLayer('Muni borders')
    map.moveLayer('MAPC outline')
 
    map.on('click', 'Muni choropleth', (e) => {
      let muni = e.features[0].properties.town;
      let year = document.querySelector('#year').value;
      let yearRange = year === '2019' ? '2019–⁠2020' : '2018–⁠2019'
      let policyBoard = governmentInfo[`${year}`][`${muni}`]['Policy Board'] !== '' ?
        governmentInfo[`${year}`][`${muni}`]['Policy Board'] 
        : 'unknown'
      let legislativeBody = governmentInfo[`${year}`][`${muni}`]['Legislative Body'] !== '' ?
        governmentInfo[`${year}`][`${muni}`]['Legislative Body']
        : 'unknown'
      let cmo = governmentInfo[`${year}`][`${muni}`]['Chief Municipal Official'] !== '' ?
      governmentInfo[`${year}`][`${muni}`]['Chief Municipal Official']
      : 'unknown'
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`
          <p class="tooltip__title tooltip__title--datacommon">${muni} (${yearRange})</p>
          <ul class='tooltip__list'>
          <li class="tooltip__text tooltip__text--datacommon">Policy board type: ${policyBoard}</li>
          <li class="tooltip__text tooltip__text--datacommon">Legislative body type: ${legislativeBody}</li>
          <li class="tooltip__text tooltip__text--datacommon">Chief Municipal Official: ${cmo}</li>
          </ul>
        `)
        .addTo(map);
    })

    document.querySelector('#type').addEventListener("change", (e) => {
      switch(e.target.value) {
        case 'policy':
          document.querySelector('#legend__policy-board').style.display ="inline"
          document.querySelector('#legend__legislative-body').style.display ="none"
          document.querySelector('#legend__cmo').style.display ="none"
          if (document.querySelector("#year").value === '2019') {
            map.setPaintProperty('Muni choropleth', 'fill-color', policyColorExpression19)
          } else if (document.querySelector("#year").value === '2018') {
            map.setPaintProperty('Muni choropleth', 'fill-color', policyColorExpression18)
          }
          break;
        case 'legislative':
          document.querySelector('#legend__policy-board').style.display ="none"
          document.querySelector('#legend__legislative-body').style.display ="inline"
          document.querySelector('#legend__cmo').style.display ="none"
          if (document.querySelector("#year").value === '2019') {
            map.setPaintProperty('Muni choropleth', 'fill-color', legislativeColorExpression19)
          } else if (document.querySelector("#year").value === '2018') {
            map.setPaintProperty('Muni choropleth', 'fill-color', legislativeColorExpression18)
          }
          break;
        case 'cmo':
          document.querySelector('#legend__policy-board').style.display ="none"
          document.querySelector('#legend__legislative-body').style.display ="none"
          document.querySelector('#legend__cmo').style.display ="inline"
          if (document.querySelector("#year").value === '2019') {
            map.setPaintProperty('Muni choropleth', 'fill-color', cmoColorExpression19)
          } else if (document.querySelector("#year").value === '2018') {
            map.setPaintProperty('Muni choropleth', 'fill-color', cmoColorExpression18)
          }
          break;
      }
    })

    document.querySelector('#year').addEventListener("change", (e) => {
      if (e.target.value === '2019' && document.querySelector('#type').value === 'policy') {
        map.setPaintProperty('Muni choropleth', 'fill-color', policyColorExpression19);
      } else if (e.target.value === '2018' && document.querySelector('#type').value === 'policy') {
        map.setPaintProperty('Muni choropleth', 'fill-color', policyColorExpression18);
      } else if (e.target.value === '2019' && document.querySelector('#type').value === 'legislative') {
        map.setPaintProperty('Muni choropleth', 'fill-color', legislativeColorExpression19);
      } else if (e.target.value === '2018' && document.querySelector('#type').value === 'legislative') {
        map.setPaintProperty('Muni choropleth', 'fill-color', legislativeColorExpression18);
      } else if (e.target.value === '2019' && document.querySelector('#type').value === 'cmo') {
        map.setPaintProperty('Muni choropleth', 'fill-color', cmoColorExpression19);
      } else if (e.target.value === '2018' && document.querySelector('#type').value === 'cmo') {
        map.setPaintProperty('Muni choropleth', 'fill-color', cmoColorExpression18);
      }
    })
  });
});

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "291px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})
