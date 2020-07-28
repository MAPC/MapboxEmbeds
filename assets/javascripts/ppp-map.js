const legend1 = document.querySelector('#legend1');
const legend2 = document.querySelector('#legend2');
const legend3 = document.querySelector('#legend3');
const legend4 = document.querySelector('#legend4');
const currentNaicsCode = document.querySelector('.legend__select')

d3.csv('https://raw.githubusercontent.com/MAPC/paycheck-protection-program-ma/master/PPP-data-joined.csv')
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
  const loansByNaicsAndMuni = response.reduce((municipalities, loan) => {
    let municipality = municipalities.find(municipality => { return municipality.muni === loan.City })
    if (!municipality) {
      municipality = {
        muni: loan.City,
        loans: {
          total: 0,
          11: 0,
          21: 0,
          22: 0,
          23: 0,
          31: 0, // 31, 32, 33
          42: 0,
          44: 0, // 44-45
          48: 0, //48-49
          51: 0,
          52: 0,
          53: 0,
          54: 0,
          55: 0,
          56: 0,
          61: 0,
          62: 0,
          71: 0,
          72: 0,
          81: 0,
          92: 0,
        },
        establishments: {
          total: 0,
        },
      }
      municipalities.push(municipality)
    }
    municipality.loans.total += 1;
    if (loan.NAICSCode2 == 31 || loan.NAICSCode2 == 32 || loan.NAICSCode2 == 33) {
      municipality.loans['31'] += 1;
    } else if (loan.NAICSCode2 == 44 || loan.NAICSCode2 == 45) {
      municipality.loans['44'] += 1;
    } else if (loan.NAICSCode2 == 48 || loan.NAICSCode2 == 49) {
      municipality.loans['48'] += 1;
    } else {
      municipality.loans[`${loan.NAICSCode2}`] += 1;
    }
    if (!municipality.establishments[`${loan.NAICSCode2}`] && loan.estab !== 'NA') {
      municipality.establishments.total += +loan.estab
      municipality.establishments[`${loan.NAICSCode2}`] = +loan.estab;
    }
    return municipalities
  }, []);


  const muniNames = loansByNaicsAndMuni.map(row => row.muni).sort()
  console.log(loansByNaicsAndMuni)
  console.log(muniNames)
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  map.on('load', () => {
    document.querySelector('.legend__wrapper').style.display = 'unset';
    const muniColor = (value) => {
      if (value >= .75) {
        return colorPalette[3]
      } else if (value >= .50) {
        return colorPalette[2]
      } else if (value >= .25) {
        return colorPalette[1]
      } else if (value >= 0) {
        return colorPalette[0]
      }
    }

    const muniColorExpression = {
      total: ['match', ['get', 'town']],
      11: ['match', ['get', 'town']],
      21: ['match', ['get', 'town']],
      22: ['match', ['get', 'town']],
      23: ['match', ['get', 'town']],
      31: ['match', ['get', 'town']], // 31, 32, 33
      42: ['match', ['get', 'town']],
      44: ['match', ['get', 'town']], // 44-45
      48: ['match', ['get', 'town']], //48-49
      51: ['match', ['get', 'town']],
      52: ['match', ['get', 'town']],
      53: ['match', ['get', 'town']],
      54: ['match', ['get', 'town']],
      55: ['match', ['get', 'town']],
      56: ['match', ['get', 'town']],
      61: ['match', ['get', 'town']],
      62: ['match', ['get', 'town']],
      71: ['match', ['get', 'town']],
      72: ['match', ['get', 'town']],
      81: ['match', ['get', 'town']],
      92: ['match', ['get', 'town']],
    }
    loansByNaicsAndMuni.forEach((row) => {
      muniColorExpression['total'].push(row.muni, (+row.loans['total'] && +row.establishments['total']) ? muniColor((+row.loans['total'])/ (+row.establishments['total'])) : '#bfbeba')
      muniColorExpression['11'].push(row.muni, (+row.loans['11'] && +row.establishments['11']) ? muniColor((+row.loans['11'])/ (+row.establishments['11'])) : '#bfbeba')
      muniColorExpression['21'].push(row.muni, (+row.loans['21'] && +row.establishments['21']) ? muniColor((+row.loans['21'])/ (+row.establishments['21'])) : '#bfbeba')
      muniColorExpression['22'].push(row.muni, (+row.loans['22'] && +row.establishments['22']) ? muniColor((+row.loans['22'])/ (+row.establishments['22'])) : '#bfbeba')
      muniColorExpression['23'].push(row.muni, (+row.loans['23'] && +row.establishments['23']) ? muniColor((+row.loans['23'])/ (+row.establishments['23'])) : '#bfbeba')
      muniColorExpression['31'].push(row.muni, (+row.loans['31'] && +row.establishments['31']) ? muniColor((+row.loans['31'])/ (+row.establishments['31'])) : '#bfbeba')
      muniColorExpression['42'].push(row.muni, (+row.loans['42'] && +row.establishments['42']) ? muniColor((+row.loans['42'])/ (+row.establishments['42'])) : '#bfbeba')
      muniColorExpression['44'].push(row.muni, (+row.loans['44'] && +row.establishments['44']) ? muniColor((+row.loans['44'])/ (+row.establishments['44'])) : '#bfbeba')
      muniColorExpression['48'].push(row.muni, (+row.loans['48'] && +row.establishments['48']) ? muniColor((+row.loans['48'])/ (+row.establishments['48'])) : '#bfbeba')
      muniColorExpression['51'].push(row.muni, (+row.loans['51'] && +row.establishments['51']) ? muniColor((+row.loans['51'])/ (+row.establishments['51'])) : '#bfbeba')
      muniColorExpression['52'].push(row.muni, (+row.loans['52'] && +row.establishments['52']) ? muniColor((+row.loans['52'])/ (+row.establishments['52'])) : '#bfbeba')
      muniColorExpression['53'].push(row.muni, (+row.loans['53'] && +row.establishments['53']) ? muniColor((+row.loans['53'])/ (+row.establishments['53'])) : '#bfbeba')
      muniColorExpression['54'].push(row.muni, (+row.loans['54'] && +row.establishments['54']) ? muniColor((+row.loans['54'])/ (+row.establishments['54'])) : '#bfbeba')
      muniColorExpression['55'].push(row.muni, (+row.loans['55'] && +row.establishments['55']) ? muniColor((+row.loans['55'])/ (+row.establishments['55'])) : '#bfbeba')
      muniColorExpression['56'].push(row.muni, (+row.loans['56'] && +row.establishments['56']) ? muniColor((+row.loans['56'])/ (+row.establishments['56'])) : '#bfbeba')
      muniColorExpression['61'].push(row.muni, (+row.loans['61'] && +row.establishments['61']) ? muniColor((+row.loans['61'])/ (+row.establishments['61'])) : '#bfbeba')
      muniColorExpression['62'].push(row.muni, (+row.loans['62'] && +row.establishments['62']) ? muniColor((+row.loans['62'])/ (+row.establishments['62'])) : '#bfbeba')
      muniColorExpression['71'].push(row.muni, (+row.loans['71'] && +row.establishments['71']) ? muniColor((+row.loans['71'])/ (+row.establishments['71'])) : '#bfbeba')
      muniColorExpression['72'].push(row.muni, (+row.loans['72'] && +row.establishments['72']) ? muniColor((+row.loans['72'])/ (+row.establishments['72'])) : '#bfbeba')
      muniColorExpression['81'].push(row.muni, (+row.loans['81'] && +row.establishments['81']) ? muniColor((+row.loans['81'])/ (+row.establishments['81'])) : '#bfbeba')
      muniColorExpression['92'].push(row.muni, (+row.loans['92'] && +row.establishments['92']) ? muniColor((+row.loans['92'])/ (+row.establishments['92'])) : '#bfbeba')
    })
    muniColorExpression['total'].push('#bfbeba');
    muniColorExpression['11'].push('#bfbeba');
    muniColorExpression['21'].push('#bfbeba');
    muniColorExpression['22'].push('#bfbeba');
    muniColorExpression['23'].push('#bfbeba');
    muniColorExpression['31'].push('#bfbeba');
    muniColorExpression['42'].push('#bfbeba');
    muniColorExpression['44'].push('#bfbeba');
    muniColorExpression['48'].push('#bfbeba');
    muniColorExpression['51'].push('#bfbeba');
    muniColorExpression['52'].push('#bfbeba');
    muniColorExpression['53'].push('#bfbeba');
    muniColorExpression['54'].push('#bfbeba');
    muniColorExpression['55'].push('#bfbeba');
    muniColorExpression['56'].push('#bfbeba');
    muniColorExpression['61'].push('#bfbeba');
    muniColorExpression['62'].push('#bfbeba');
    muniColorExpression['71'].push('#bfbeba');
    muniColorExpression['72'].push('#bfbeba');
    muniColorExpression['81'].push('#bfbeba');
    muniColorExpression['92'].push('#bfbeba');

    map.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': muniColorExpression['total'],
        'fill-outline-color': 'black',
      }
    })
    map.moveLayer('MAPC outline')

    map.on('click', 'Muni choropleth', function(e) {
      if (e.features[0].properties.town !== 'MOUNT WASHINGTON' && e.features[0].properties.town !== 'MONROE' && e.features[0].properties.town !== 'LEVERETT') {
        const pppPercentage = loansByNaicsAndMuni.find(row => row.muni === e.features[0].properties.town)
        const borrowers = pppPercentage.loans[`${currentNaicsCode.value}`]
        const establishments = pppPercentage.establishments[`${currentNaicsCode.value}`]
        const percentageCovered = (+borrowers / +establishments) < 1 ? (+borrowers / +establishments) : 1;
        let tooltipHtml = `
          <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.town}</p>
          <ul class='tooltip__list'>
          <li class="tooltip__text tooltip__text--datacommon">${d3.format(',')(+borrowers)} loans</li>
        `;
        if (establishments) {
          tooltipHtml += `
            <li class="tooltip__text tooltip__text--datacommon">${d3.format(',')(+establishments)} total establishments (2018 ES-202)</li>
            <li class="tooltip__text tooltip__text--datacommon">${d3.format('.1%')(percentageCovered)} of establishments covered</li>
            </ul>
          `
        } else {
          tooltipHtml += `
            <li class="tooltip__text tooltip__text--datacommon">Total # of establishments (2018 ES-202) unavailable</li>
            <li class="tooltip__text tooltip__text--datacommon">Percentage of establishments covered unavailable</li>
            </ul>
          `
        }
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(tooltipHtml)
          .addTo(map);
      } else {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
          <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.town}</p>
          <p class="tooltip__text tooltip__text--datacommon">No loan or establishment data available</p>
          `)
          .addTo(map);
      }
      
    })

    document.querySelector('.legend__select').addEventListener('change', (e) => {
      map.setPaintProperty('Muni choropleth', 'fill-color', muniColorExpression[`${e.target.value}`])
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
  document.querySelector('.legend').style.maxHeight = "345px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})
