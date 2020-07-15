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
    style: "mapbox://styles/ihill/ckcnnn63u26o11ip2qf4odwyp/draft",
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
    muniColorExpression.push('#B57F00');

    // // // // //

    const colorZipcodes = d3.scaleQuantize()
      .domain([0, d3.max(loansByZip.map(d => d.loans))])
      .range(colorPalette)
    const zipColorExpression = ['match', ['get', 'POSTCODE']];
    loansByZip.forEach((row) => {
      zipColorExpression.push(`0${row.zip}`, colorZipcodes(+row.loans))
    })
    zipColorExpression.push('#B57F00');

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
      'source-layer': 'ZipCodes-a3m7xa',
      paint: {
        'fill-color': zipColorExpression
      }
    })

    map.addLayer({
      id: 'ZIP borders',
      type: 'line',
      source: 'composite',
      'source-layer': 'ZipCodes-a3m7xa',
      paint: {
        'line-color': 'black',
      }
    })
  });
})


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
