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
  const colorPalette = ['#0097c4', '#3b66b0', '#233069', '#111436'];
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
    const muniColor = d3.scaleQuantize()
      .domain([0,8000])
      .range(colorPalette);
    const muniColorExpression = ['match', ['get', 'muni']];
    loansByMuni.forEach((row) => {
      muniColorExpression.push(row.muni, muniColor(+row.loans))
    });
    muniColorExpression.push('#bfbeba');

    const colorZipcodes = d3.scaleQuantize()
      .domain([0, d3.max(loansByZip.map(d => d.loans))])
      .range(colorPalette)
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
        'fill-color': muniColorExpression
      }
    })
    map.addLayer({
      id: 'Muni borders',
      type: 'line',
      source: 'composite',
      'source-layer': 'CovidHousingAssistance',
      paint: {
        'line-color': 'black',
      }
    })
    map.addLayer({
      id: 'ZIP choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'ZipCodes',
      paint: {
        'fill-color': zipColorExpression
      },
      layout: {
        'visibility': 'none',
      }
    })
    map.addLayer({
      id: 'ZIP borders',
      type: 'line',
      source: 'composite',
      'source-layer': 'ZipCodes',
      paint: {
        'line-color': 'black',
      },
      layout: {
        'visibility': 'none',
      }
    })

    map.on('click', 'Muni choropleth', function(e) {
      const pppLoan = loansByMuni.find(row => row.muni === e.features[0].properties.muni).loans
      const tooltipHtml = `
      <p class="tooltip__title">${e.features[0].properties.muni}</p>
      <p class="tooltip__text">${pppLoan}</p>
    `;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(tooltipHtml)
        .addTo(map);
    })

    map.on('click', 'ZIP choropleth', function(e) {
      const pppLoan = loansByZip.find(row => `0${row.zip}` == e.features[0].properties.POSTCODE).loans
      const tooltipHtml = `
      <p class="tooltip__title">${e.features[0].properties.POSTCODE}</p>
      <p class="tooltip__text">${pppLoan}</p>
    `;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(tooltipHtml)
        .addTo(map);
    })

    map.moveLayer('Muni choropleth', 'Environmental Justice');
    map.moveLayer('ZIP choropleth', 'Environmental Justice');

    console.log(map.getStyle())
  });

  document.querySelector('.legend__controls').addEventListener('click', (e) => {
    if (e.target.id === 'muni') {
      map.setLayoutProperty('Muni choropleth', 'visibility', 'visible');
      map.setLayoutProperty('Muni borders', 'visibility', 'visible');
      map.setLayoutProperty('ZIP choropleth', 'visibility', 'none');
      map.setLayoutProperty('ZIP borders', 'visibility', 'none');
    } else if (e.target.id === 'zip') {
      map.setLayoutProperty('Muni choropleth', 'visibility', 'none');
      map.setLayoutProperty('Muni borders', 'visibility', 'none');
      map.setLayoutProperty('ZIP choropleth', 'visibility', 'visible');
      map.setLayoutProperty('ZIP borders', 'visibility', 'visible');
    } else if (e.target.id === 'envjustice') {
      if (e.target.checked) {
        map.setPaintProperty('Environmental Justice', 'fill-opacity', 1);
      } else {
        map.setPaintProperty('Environmental Justice', 'fill-opacity', 0);
      }
    }
  })
})

document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "0";
  document.querySelector('.maximize-instructions').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'inline';
  document.querySelector('.button__collapsible--minus').style.display = 'none';
})

document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
  document.querySelector('.legend').style.maxHeight = "221px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})
