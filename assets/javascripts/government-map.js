Promise.all([
  d3.csv('/MapboxEmbeds/assets/data/government-1920.csv'),
  d3.csv('/MapboxEmbeds/assets/data/government-1819.csv')
])
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
  let leftMap = new mapboxgl.Map({
    container: 'left-map',
    zoom,
    minZoom: 6,
    maxZoom: 13,
    center,
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
    zoom,
    minZoom: 6,
    maxZoom: 13,
    center,
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ],
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });

  let comparisonMap = new mapboxgl.Compare(leftMap, rightMap, '.map__container', {});

  leftMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  rightMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  const governmentInfo = {
    "2019": {},
    "2018": {}
  };
  const colorPalette = ['#3b66b0', '#9cacd6', '#a28fba', '#472b78', '#2C003B']
  const policyBoardColor = (value) => {
    if (value === "Select Board") {
      return colorPalette[0]
    } else if (value === "Selectmen") {
      return colorPalette[1]
    } else if (value ===  "Council") {
      return colorPalette[2]
    }
  };
  const legislativeColor = (value) => {
    if (value === "Representative Town Meeting") {
      return colorPalette[0]
    } else if (value === "Open Town Meeting") {
      return colorPalette[1]
    } else if (value === "Aldermen") {
      return colorPalette[2]
    } else if (value === "Council") {
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
    } else if (value === "Chair of the Board of Selectmen") {
      return colorPalette[3]
    } else {
      return colorPalette[4]
    }
  };

  const selectBoardPattern = (value) => {
    if (value == 3) {
      return 'dot-11'
    } else if (value == 5) {
      return 'Pattern_Hatching_White'
    } else {
      return 'new-blank'
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
    policyColorExpression19.push(row.TOWN, row['Policy Board'] !== '' ? policyBoardColor(row['Policy Board']) : colorPalette[3])
    legislativeColorExpression19.push(row.TOWN, row['Legislative Body'] !== '' ? legislativeColor(row['Legislative Body']) : colorPalette[4])
    cmoColorExpression19.push(row.TOWN, row['Chief Municipal Official'] !== '' ? cmoColor(row['Chief Municipal Official']) : colorPalette[4])
    selectBoardExpression19.push(row.TOWN, row['Policy Board Member Count'] !== '' ? selectBoardPattern(row['Policy Board Member Count']) : 'new-blank')

  });

  response[1].forEach((row) => {
    governmentInfo["2018"][`${row.TOWN}`] = row
    policyColorExpression18.push(row.TOWN, row['Policy Board'] !== '' ? policyBoardColor(row['Policy Board']) : colorPalette[3])
    legislativeColorExpression18.push(row.TOWN, row['Legislative Body'] !== '' ? legislativeColor(row['Legislative Body']) : colorPalette[4])
    cmoColorExpression18.push(row.TOWN, row['Chief Municipal Official'] !== '' ? cmoColor(row['Chief Municipal Official']) : colorPalette[4])
    selectBoardExpression18.push(row.TOWN, row['Policy Board Member Count'] !== '' ? selectBoardPattern(row['Policy Board Member Count']) : 'new-blank')
  });

  policyColorExpression18.push(colorPalette[3]);
  legislativeColorExpression18.push(colorPalette[4]);
  cmoColorExpression18.push(colorPalette[4]);
  selectBoardExpression18.push('new-blank');

  policyColorExpression19.push(colorPalette[3]);
  legislativeColorExpression19.push(colorPalette[4]);
  cmoColorExpression19.push(colorPalette[4]);
  selectBoardExpression19.push('new-blank');

  let muniEl = document.querySelector('#muni')
  let entry18El = document.querySelector('#entry18')
  let entry19El = document.querySelector('#entry19')

  leftMap.on('load', () => {
    document.querySelector('.legend__wrapper').style.display = 'unset';
    leftMap.setPaintProperty('background', 'background-color', '#FCF2FB');
    leftMap.setPaintProperty('External State', 'fill-color', '#FCF2FB');
    leftMap.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': policyColorExpression18,
      }
    })

    leftMap.loadImage('/MapboxEmbeds/assets/images/blank-square.png', function (err, image) {
      if (err) throw err;
      leftMap.addImage('new-blank', image)

      leftMap.addLayer({
        id: 'Selectmen choropleth',
        type: 'fill',
        source: 'composite',
        'source-layer': 'MA_Munis',
        paint: {
          'fill-pattern': selectBoardExpression18,
        }
      })
      leftMap.setPaintProperty('Muni borders', 'line-color', 'white');
      leftMap.moveLayer('Muni borders')
      leftMap.moveLayer('MAPC outline')
      leftMap.on('click', 'Muni choropleth', (e) => setLegend(e))
    })

  });

  rightMap.on('load', () => {
    leftMap.resize();
    rightMap.resize();
    rightMap.setPaintProperty('background', 'background-color', '#FCF2FB');
    rightMap.setPaintProperty('External State', 'fill-color', '#FCF2FB');


    rightMap.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': policyColorExpression19,
      }
    })

    rightMap.loadImage('/MapboxEmbeds/assets/images/blank-square.png', function (err, image) {
      if (err) throw err;
      rightMap.addImage('new-blank', image)

      rightMap.addLayer({
        id: 'Selectmen choropleth',
        type: 'fill',
        source: 'composite',
        'source-layer': 'MA_Munis',
        paint: {
          'fill-pattern': selectBoardExpression19,
        }
      })
      rightMap.setPaintProperty('Muni borders', 'line-color', 'white');
      rightMap.moveLayer('Muni borders')
      rightMap.moveLayer('MAPC outline')
      rightMap.on('click', 'Muni choropleth', (e) => setLegend(e))
    })
  })

  document.querySelector('#type').addEventListener("change", (e) => {
    switch(e.target.value) {
      case 'policy':
        document.querySelector('#legend__policy-board').style.display ="inline"
        document.querySelector('#legend__legislative-body').style.display ="none"
        document.querySelector('#legend__cmo').style.display ="none"
        leftMap.setPaintProperty('Muni choropleth', 'fill-color', policyColorExpression18)
        rightMap.setPaintProperty('Muni choropleth', 'fill-color', policyColorExpression19)
        leftMap.setLayoutProperty('Selectmen choropleth', 'visibility', 'visible');
        rightMap.setLayoutProperty('Selectmen choropleth', 'visibility', 'visible');
        break;
      case 'legislative':
        document.querySelector('#legend__policy-board').style.display ="none"
        document.querySelector('#legend__legislative-body').style.display ="inline"
        document.querySelector('#legend__cmo').style.display ="none"
        leftMap.setPaintProperty('Muni choropleth', 'fill-color', legislativeColorExpression18)
        rightMap.setPaintProperty('Muni choropleth', 'fill-color', legislativeColorExpression19)
        leftMap.setLayoutProperty('Selectmen choropleth', 'visibility', 'none');
        rightMap.setLayoutProperty('Selectmen choropleth', 'visibility', 'none');
        break;
      case 'cmo':
        document.querySelector('#legend__policy-board').style.display ="none"
        document.querySelector('#legend__legislative-body').style.display ="none"
        document.querySelector('#legend__cmo').style.display ="inline"
        leftMap.setPaintProperty('Muni choropleth', 'fill-color', cmoColorExpression18)
        rightMap.setPaintProperty('Muni choropleth', 'fill-color', cmoColorExpression19)
        leftMap.setLayoutProperty('Selectmen choropleth', 'visibility', 'none');
        rightMap.setLayoutProperty('Selectmen choropleth', 'visibility', 'none');
        break;
    }
  })

  const setLegend = (e) => {
    document.querySelector('.map__title-box').style.display = 'unset'
    let muni = e.features[0].properties.town
    muniEl.innerText = `${toCamelCase(muni)} (${governmentInfo['2019'][`${muni}`]['Town/City']})`;
    if (document.querySelector('#type').value === 'policy') {
      if (governmentInfo['2018'][`${muni}`]['Policy Board'] !== '') {
        entry18El.innerText = `2018–2019 Policy board: ${governmentInfo['2018'][`${muni}`]['Policy Board']}`
      } else {
        entry18El.innerText = `No 2018–2019 policy board`
      }
      if (governmentInfo['2019'][`${muni}`]['Policy Board'] !== '') {
        entry19El.innerText = `2019–2020 Policy board: ${governmentInfo['2019'][`${muni}`]['Policy Board']}`
      } else {
        entry18El.innerText = `No 2019–2020 policy board`
      }
    } else if (document.querySelector('#type').value === 'legislative') {
      entry18El.innerText = `2018–2019 Legislative body: ${governmentInfo['2018'][`${muni}`]['Legislative Body']}`
      entry19El.innerText = `2019–2020 Legislative body: ${governmentInfo['2019'][`${muni}`]['Legislative Body']}`
    } else if (document.querySelector('#type').value === 'cmo') {
      entry18El.innerText = `2018–2019 Chief municipal official: ${governmentInfo['2018'][`${muni}`]['Chief Municipal Official']}`
      entry19El.innerText = `2019–2020 Chief municipal official: ${governmentInfo['2019'][`${muni}`]['Chief Municipal Official']}`
    }
  }

  const compareButton = document.querySelector('.compare-swiper-vertical')
  const beforeText = document.createElement("span")
  beforeText.innerText = "2018–2019"
  beforeText.classList = 'mapboxgl-compare__label mapboxgl-compare__before'
  const afterText = document.createElement("span")
  afterText.innerText = '2019–2020'
  afterText.classList = 'mapboxgl-compare__label mapboxgl-compare__after'
  compareButton.parentNode.insertBefore(beforeText, compareButton)
  compareButton.parentNode.insertBefore(afterText, compareButton.nextSibling)

  compareButton.style.top = '70%'
  beforeText.style.top = '70%'
  afterText.style.top = '70%'
});

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "300px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})

function toCamelCase(muniName) {
  return muniName.split(" ")
    .map((word) => word.charAt(0).concat(word.slice(1).toLowerCase()))
    .join(' ');
}