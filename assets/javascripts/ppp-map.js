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

  console.log(loansByNaicsAndMuni)

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
    const muniColorExpression = ['match', ['get', 'muni']];

    loansByNaicsAndMuni.forEach((row) => {
      muniColorExpression.push(row.muni, (+row.loans['11'] && +row.establishments['11']) ? muniColor((+row.loans['11'])/ (+row.establishments['11'])) : '#bfbeba')
    })
    muniColorExpression.push('#bfbeba');

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
    map.moveLayer('MAPC outline')

    map.on('click', 'Muni choropleth', function(e) {
      const pppPercentage = loansByNaicsAndMuni.find(row => row.muni === e.features[0].properties.muni)
      const borrowers = pppPercentage.loans[`${currentNaicsCode.value}`]
      const establishments = pppPercentage.establishments[`${currentNaicsCode.value}`]
      const percentageCovered = (+borrowers / +establishments) < 1 ? (+borrowers / +establishments) : 1;
      console.log(pppPercentage)
      let tooltipHtml = `
        <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.muni}</p>
        <ul class='tooltip__list'>
        <li class="tooltip__text tooltip__text--datacommon">${+borrowers} loans</li>
    `;
    if (establishments) {
      tooltipHtml += `
        <li class="tooltip__text tooltip__text--datacommon">${+establishments} total establishments (2018 ES-202)</li>
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
