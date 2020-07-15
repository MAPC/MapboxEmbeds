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

  console.log(loansByMuni)
  console.log(loansByZip)

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  map.on('load', () => {
    const colorPolygon = d3.scaleQuantize()
      .domain([0,8000])
      .range(colorPalette);
    const colorExpression = ['match', ['upcase', ['get', 'municipal']]];
    const colorExpressionOutsideMapc = ['match', ['upcase', ['get', 'town']]];
    loansByMuni.forEach((row) => {
      colorExpression.push(row.muni, colorPolygon(+row.loans))
      colorExpressionOutsideMapc.push(row.muni, colorPolygon(+row.loans))
    });
    colorExpression.push('#B57F00');
    colorExpressionOutsideMapc.push('#B57F00');

    const colorZipcodes = d3.scaleQuantize()
      .domain([0, d3.max(loansByZip.map(d => d.loans))])
      .range(colorPalette)

    const colorZipcodesMatch = ['match', ['get', 'POSTCODE']];
    loansByZip.forEach((row) => {
      colorZipcodesMatch.push(`0${row.zip}`, colorZipcodes(+row.loans))
    })
    colorZipcodesMatch.push('#B57F00');

    map.addLayer({
      id: 'tracts-choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'Muni_Divisions-8ix6ih',
      paint: {
        'fill-color': colorExpression,
      },
    });
    map.addLayer({
      id: 'tracts-choropleth2',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_outside_mapc-93a45c',
      paint: {
        'fill-color': colorExpressionOutsideMapc,
      },
    });
    map.addLayer({
      id: 'MAPC borders',
      type: 'line',
      source: 'composite',
      'source-layer': 'Muni_Divisions-8ix6ih',
      paint: {
        'line-color': 'black',
      },
    });
    map.addLayer({
      id: 'MA borders',
      type: 'line',
      source: 'composite',
      'source-layer': 'MA_outside_mapc-93a45c',
      paint: {
        'line-color': 'black',
      },
    });

    map.addLayer({
      id: 'ZIP choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'ZipCodes-a3m7xa',
      paint: {
        'fill-color': colorZipcodesMatch
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
