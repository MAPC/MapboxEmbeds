const legend1 = document.querySelector('#legend1');
const legend2 = document.querySelector('#legend2');
const legend3 = document.querySelector('#legend3');
const legend4 = document.querySelector('#legend4');

d3.csv('https://raw.githubusercontent.com/MAPC/paycheck-protection-program-ma/master/PPP-202-join.csv')
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
  let map = new mapboxgl.Map({
    container: 'map',
    zoom,
    minZoom: 6,
    maxZoom: 13,
    center,
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ],
    style: "mapbox://styles/ihill/ckd4s0ptt1byo1hrlkjyn5zvy?fresh=true",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });
  const colorPalette = ["#edf8fb","#b2e2e2","#66c2a4","#238b45"];
  const naicsCodes = [11, 21, 22, 23, 31, 32, 33, 42, 44, 45, 48, 49, 51, 52, 53, 54, 55, 56, 61, 62, 71, 72, 81, 92]
  const sectors = {
    11: 'Agrictulure, Forestry, Fishing and Hunting',
    21: 'Mining, Quarrying, and Oil and Gas Extraction',
    22: 'Utilities',
    23: 'Construction',
    31: 'Manufacturing',
    42: 'Wholesale Trade',
    44: 'Retail Trade',
    48: 'Transportation and Warehousing',
    51: 'Information',
    52: 'Finance and Insurance',
    53: 'Real Estate and Rental and Leasing',
    54: 'Professional, Scientific, and Technical Services',
    55: 'Management of Companies and Enterprises',
    56: 'Administrative and Support and Waste Management and Remediation Services',
    61: 'Educational Services',
    62: 'Health Care and Social Assistance',
    71: 'Arts, Entertainment, and Recreation',
    72: 'Accomodation and Food Services',
    81: 'Other Services (except Public Administration)',
    92: 'Public Administration',
  };

  const loansByMuni = response.reduce((municipalities, loan) => {
    let municipality = municipalities.find(municipality => { return municipality.muni === loan.City })
    if (!municipality) {
      municipality = {
        muni: loan.City,
        establishments: loan.total_estab,
        totalLoans: 0,
        loans: {
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
      }
      municipalities.push(municipality)
    }
    if (naicsCodes.includes(+loan.NAICSCode2)) {
      municipality.totalLoans += 1;
      if (loan.NAICSCode2 == 31 || loan.NAICSCode2 == 32 || loan.NAICSCode2 == 33) {
        municipality.loans['31'] += 1;
      } else if (loan.NAICSCode2 == 44 || loan.NAICSCode2 == 45) {
        municipality.loans['44'] += 1;
      } else if (loan.NAICSCode2 == 48 || loan.NAICSCode2 == 49) {
        municipality.loans['48'] += 1;
      } else {
        municipality.loans[`${loan.NAICSCode2}`] += 1;
      }
    }
    return municipalities
  }, []);

  loansByMuni.push({
    muni: 'LEVERETT',
    establishments: '49',
    totalLoans: 0,
  })

  loansByMuni.push({
    muni: 'MONROE',
    establishments: '#N/A',
    totalLoans: 0,
  })

  loansByMuni.push({
    muni: 'MOUNT WASHINGTON',
    establishments: '3',
    totalLoans: 0,
  })

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

    const muniColorExpression = ['match', ['get', 'town']];

    loansByMuni.forEach((row) => {
      muniColorExpression.push(row.muni, (+row.totalLoans && +row.establishments) ? muniColor((+row.totalLoans)/ (+row.establishments)) : '#bfbeba')
    })
    muniColorExpression.push('#bfbeba');

    map.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': muniColorExpression,
        'fill-outline-color': 'black',
      }
    })
    map.moveLayer('MA muni borders')
    map.moveLayer('MAPC outline')
    map.moveLayer('settlement-major-label')
    map.moveLayer('settlement-minor-label')

    map.on('click', 'Muni choropleth', function(e) {
      const pppPercentage = loansByMuni.find(row => row.muni === e.features[0].properties.town)
      if (pppPercentage.loans) {
        let loans = Object.entries(pppPercentage.loans)
        let max = loans[0];
        loans.forEach((sector) => {
          if (sector[1] > max[1]) {
            max = sector
          }
        })
        if (pppPercentage.establishments !== '#N/A') {
          const establishments = +pppPercentage.establishments
          const percentageCovered = (+pppPercentage.totalLoans / +establishments) < 1 ? (+pppPercentage.totalLoans / +establishments) : 1;
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.town}</p>
              <ul class='tooltip__list'>
              <li class="tooltip__text tooltip__text--datacommon">${d3.format('.1%')(percentageCovered)} of ${d3.format(',')(+pppPercentage.establishments)} establishments covered (${d3.format(',')(+pppPercentage.totalLoans)} total loans)</li>
              <li class="tooltip__text tooltip__text--datacommon">Sector with the most loans: ${sectors[max[0]]}</li>
            `)
            .addTo(map);
        } else {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.town}</p>
              <ul class='tooltip__list'>
              <li class="tooltip__text tooltip__text--datacommon">${d3.format(',')(+pppPercentage.totalLoans)} total loans (total # of establishments unavailable)</li>
              <li class="tooltip__text tooltip__text--datacommon">Sector with the most loans: ${sectors[max[0]]}</li>
            `)
            .addTo(map);
        }
      }
      else {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.town}</p>
            <ul class='tooltip__list'>
            <li class="tooltip__text tooltip__text--datacommon">${d3.format(',')(+pppPercentage.totalLoans)} loans</li>
            <li class="tooltip__text tooltip__text--datacommon">Total # of establishments unavailable</li>
          `)
          .addTo(map);
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
  document.querySelector('.legend').style.maxHeight = "345px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})
