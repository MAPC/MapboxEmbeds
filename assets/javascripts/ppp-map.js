const legend1 = document.querySelector('#legend1');
const legend2 = document.querySelector('#legend2');
const legend3 = document.querySelector('#legend3');
const legend4 = document.querySelector('#legend4');

d3.csv('/MapboxEmbeds/assets/data/SBA-PPP-FOIA-UP-TO-150K.csv')
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
    style: "mapbox://styles/ihill/ckcnnn63u26o11ip2qf4odwyp?fresh=true",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });
  const colorPalette = ["#edf8fb","#b2e2e2","#66c2a4","#238b45"];
  const loansByMuni = response.reduce((municipalities, loan) => {
    let municipality = municipalities.find(municipality => { return municipality.muni === loan.City })
    if (!municipality) {
      municipality = {
        muni: loan.City,
        loans: 0,
      }
      municipalities.push(municipality)
    }
    municipality.loans += 1;
    return municipalities
  }, []);
  const loansByZip = response.reduce((zipCodes, loan) => {
    let zip = zipCodes.find(row => { return row.zip == loan.Zip })
    if (!zip) {
      zip = {
        zip: loan.Zip,
        loans: 0,
      }
      zipCodes.push(zip)
    }
    zip.loans += 1;
    return zipCodes
  }, []);

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  map.on('load', () => {
    document.querySelector('.legend__wrapper').style.display = 'unset';
    const muniColor = (value) => {
      if (value >= 1500) {
        return colorPalette[3]
      } else if (value >= 500) {
        return colorPalette[2]
      } else if (value >= 100) {
        return colorPalette[1]
      } else if (value >= 1) {
        return colorPalette[0]
      }
    }
    const muniColorExpression = ['match', ['get', 'muni']];
    loansByMuni.forEach((row) => {
      muniColorExpression.push(row.muni, muniColor(+row.loans))
    });
    muniColorExpression.push('#bfbeba');

    const colorZipcodes = (value) => {
      if (value >= 500) {
        return colorPalette[3]
      } else if (value >= 250) {
        return colorPalette[2]
      } else if (value >= 100) {
        return colorPalette[1]
      } else if (value >= 1) {
        return colorPalette[0]
      }
    }
    const zipColorExpression = ['match', ['get', 'POSTCODE']];
    loansByZip.forEach((row) => {
      zipColorExpression.push(`0${row.zip}`, colorZipcodes(+row.loans))
    })
    zipColorExpression.push('#bfbeba');
    map.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'CovidHousingAssistance',
      paint: {
        'fill-color': muniColorExpression,
        'fill-outline-color': 'black',
      }
    })
    map.addLayer({
      id: 'ZIP choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'ZipCodes',
      paint: {
        'fill-color': zipColorExpression,
        'fill-outline-color': 'black',
      },
      layout: {
        'visibility': 'none',
      }
    })

    map.on('click', 'Muni choropleth', function(e) {
      const pppLoan = loansByMuni.find(row => row.muni === e.features[0].properties.muni).loans
      const tooltipHtml = `
      <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.muni}</p>
      <p class="tooltip__text tooltip__text--datacommon">${d3.format(',')(pppLoan)} loans under $150K</p>
    `;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(tooltipHtml)
        .addTo(map);
    })
    map.on('click', 'ZIP choropleth', function(e) {
      const pppLoan = loansByZip.find(row => `0${row.zip}` == e.features[0].properties.POSTCODE).loans
      const tooltipHtml = `
      <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.POSTCODE}</p>
      <p class="tooltip__text tooltip__text--datacommon">${d3.format(',')(pppLoan)} loans under $150K</p>
    `;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(tooltipHtml)
        .addTo(map);
    })
    map.moveLayer('Heat Vulnerability');
    map.moveLayer('Flood');
    map.moveLayer('Future Flood 8');
    map.moveLayer('Future Flood 339');
    map.moveLayer('Environmental Justice');
    map.addLayer({
      id: 'Muni borders',
      type: 'line',
      source: 'composite',
      'source-layer': 'CovidHousingAssistance',
      paint: {
        'line-color': 'black',
      }
    })
    map.moveLayer('MAPC outline')
  });

  
  document.querySelector('.legend__controls').addEventListener('click', (e) => {
    switch(e.target.id) {
      case 'muni':
        map.setLayoutProperty('Muni choropleth', 'visibility', 'visible');
        map.setLayoutProperty('ZIP choropleth', 'visibility', 'none');
        legend1.textContent = "1–⁠99 loans"
        legend2.textContent = "100–4⁠99 loans"
        legend3.textContent = "500–14⁠99 loans"
        legend4.textContent = "1500+ loans"
        break;
      case 'zip':
        map.setLayoutProperty('Muni choropleth', 'visibility', 'none');
        map.setLayoutProperty('ZIP choropleth', 'visibility', 'visible');
        legend1.textContent = "1–⁠99 loans"
        legend2.textContent = "100–249 loans"
        legend3.textContent = "250–4⁠99 loans"
        legend4.textContent = "500+ loans"
        break;
      case 'envjustice':
        if (e.target.checked) {
          map.setPaintProperty('Environmental Justice', 'fill-opacity', 1);
        } else {
          map.setPaintProperty('Environmental Justice', 'fill-opacity', 0);
        }
        break;
      case 'heat':
        toggleVulnerabilityLayer('Heat Vulnerability', e.target);
        break;
      case 'flood':
        toggleVulnerabilityLayer('Flood', e.target);
        break;
      case 'flood8':
        toggleVulnerabilityLayer('Future Flood 8', e.target);
        break;
      case 'flood339':
        toggleVulnerabilityLayer('Future Flood 339', e.target);
        break;
    }
  });

  function toggleVulnerabilityLayer(selectedLayer, selectedElement) {
    const layers = ['Heat Vulnerability', 'Flood', 'Future Flood 8', 'Future Flood 339'];
    const selectionToggles = ['heat', 'flood', 'flood8', 'flood339']
    if (selectedElement.checked) {
      layers.forEach((layer) => {
        if (layer === selectedLayer) {
          map.setPaintProperty(layer, 'fill-opacity', 1)
        } else {
          map.setPaintProperty(layer, 'fill-opacity', 0)
        }
      });
      selectionToggles.forEach((toggle) => {
        if (toggle != selectedElement.id) {
          document.getElementById(toggle).checked = false;
        }
      });
    } else {
      map.setPaintProperty(selectedLayer, 'fill-opacity', 0);
    }
  }
})


document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "400px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})
