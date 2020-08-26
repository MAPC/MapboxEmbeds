Promise.all([
  d3.csv('/MapboxEmbeds/assets/data/government-1920.csv'),
  d3.csv('/MapboxEmbeds/assets/data/government-1819.csv')
])
.then((response) => {
  let leftMap = new mapboxgl.Map({
    container: 'left-map',
    center: [-71.566, 42.112],
    zoom: 7,
    minZoom: 6,
    maxZoom: 13,
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ],
    style: "mapbox://styles/ihill/ckcnnn63u26o11ip2qf4odwyp",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });

  let rightMap = new mapboxgl.Map({
    container: 'right-map',
    style: "mapbox://styles/ihill/ckcnnn63u26o11ip2qf4odwyp",
    center: [-71.566, 42.112],
    zoom: 7,
    minZoom: 6,
    maxZoom: 13,
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ],
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });

  let comparisonMap = new mapboxgl.Compare(leftMap, rightMap, '.map__container', {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
    });

  leftMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  const governmentInfo = {
    "2019": {},
    "2018": {}
  };
  const colorPalette = ["#3B66B0", "#FDB525", "#C7004E", "#4DC1B9"]
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

  const selectBoardPattern = (value) => {
    if (value == 3) {
      return 'dot-11'
    } else if (value == 5) {
      return 'Pattern_Hatching_White'
    } else {
      return 'blank'
    } 
  }
  const policyColorExpression19 = ['match', ['get', 'town']];
  const selectBoardExpression19 = ['match', ['get', 'town']];
  const legislativeColorExpression19 = ['match', ['get', 'town']];
  const cmoColorExpression19 = ['match', ['get', 'town']];
  const policyColorExpression18 = ['match', ['get', 'town']];
  const selectBoardExpression18 = ['match', ['get', 'town']];
  const legislativeColorExpression18 = ['match', ['get', 'town']];
  const cmoColorExpression18 = ['match', ['get', 'town']];
  
  response[0].forEach((row) => {
    governmentInfo["2019"][`${row.TOWN}`] = row
    policyColorExpression19.push(row.TOWN, row['Policy Board'] !== '' ? policyBoardColor(row['Policy Board']) : '#D1D6D6')
    legislativeColorExpression19.push(row.TOWN, row['Legislative Body'] !== '' ? legislativeColor(row['Legislative Body']) : '#D1D6D6')
    cmoColorExpression19.push(row.TOWN, row['Chief Municipal Official'] !== '' ? cmoColor(row['Chief Municipal Official']) : '#D1D6D6')
    selectBoardExpression19.push(row.TOWN, row['Policy Board Member Count'] !== '' ? selectBoardPattern(row['Policy Board Member Count']) : 'blank')
  
  });

  response[1].forEach((row) => {
    governmentInfo["2018"][`${row.TOWN}`] = row
    policyColorExpression18.push(row.TOWN, row['Policy Board'] !== '' ? policyBoardColor(row['Policy Board']) : '#D1D6D6')
    legislativeColorExpression18.push(row.TOWN, row['Legislative Body'] !== '' ? legislativeColor(row['Legislative Body']) : '#D1D6D6')
    cmoColorExpression18.push(row.TOWN, row['Chief Municipal Official'] !== '' ? cmoColor(row['Chief Municipal Official']) : '#D1D6D6')
    selectBoardExpression18.push(row.TOWN, row['Policy Board Member Count'] !== '' ? selectBoardPattern(row['Policy Board Member Count']) : 'blank')
  });

  policyColorExpression18.push('#D1D6D6');
  legislativeColorExpression18.push('#D1D6D6');
  cmoColorExpression18.push('#D1D6D6');
  selectBoardExpression18.push('blank');

  policyColorExpression19.push('#D1D6D6');
  legislativeColorExpression19.push('#D1D6D6');
  cmoColorExpression19.push('#D1D6D6');
  selectBoardExpression19.push('blank');

  leftMap.on('load', () => {
    console.log(leftMap.getStyle())
    document.querySelector('.legend__wrapper').style.display = 'unset';
    leftMap.setPaintProperty('background', 'background-color', '#f5f5f5');
    leftMap.setPaintProperty('External State', 'fill-color', '#f5f5f5');
    leftMap.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': policyColorExpression18,
        'fill-outline-color': 'black',
      }
    })

    leftMap.addLayer({
      id: 'Selectmen choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-pattern': selectBoardExpression18,
      }
    })
    leftMap.moveLayer('Muni borders')
    leftMap.moveLayer('MAPC outline')
  });

  rightMap.on('load', () => {
    rightMap.setPaintProperty('background', 'background-color', '#f5f5f5');
    rightMap.setPaintProperty('External State', 'fill-color', '#f5f5f5');
    rightMap.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': policyColorExpression19,
        'fill-outline-color': 'black',
      }
    })
    rightMap.addLayer({
      id: '2019-2020 Selectmen choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-pattern': selectBoardExpression19,
      }
    })
    rightMap.moveLayer('Muni borders')
    rightMap.moveLayer('MAPC outline')
  })

  document.querySelector('#type').addEventListener("change", (e) => {
    switch(e.target.value) {
      case 'policy':
        document.querySelector('#legend__policy-board').style.display ="inline"
        document.querySelector('#legend__legislative-body').style.display ="none"
        document.querySelector('#legend__cmo').style.display ="none"
        leftMap.setPaintProperty('Muni choropleth', 'fill-color', policyColorExpression18)
        rightMap.setPaintProperty('Muni choropleth', 'fill-color', policyColorExpression19)
        break;
      case 'legislative':
        document.querySelector('#legend__policy-board').style.display ="none"
        document.querySelector('#legend__legislative-body').style.display ="inline"
        document.querySelector('#legend__cmo').style.display ="none"
        leftMap.setPaintProperty('Muni choropleth', 'fill-color', legislativeColorExpression18)
        rightMap.setPaintProperty('Muni choropleth', 'fill-color', legislativeColorExpression19)
        break;
      case 'cmo':
        document.querySelector('#legend__policy-board').style.display ="none"
        document.querySelector('#legend__legislative-body').style.display ="none"
        document.querySelector('#legend__cmo').style.display ="inline"
        leftMap.setPaintProperty('Muni choropleth', 'fill-color', cmoColorExpression18)
        rightMap.setPaintProperty('Muni choropleth', 'fill-color', cmoColorExpression19)
        break;
    }
  })
});

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "263px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})
