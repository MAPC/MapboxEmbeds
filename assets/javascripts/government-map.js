d3.csv('/MapboxEmbeds/assets/data/government-1920.csv')
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
    style: "mapbox://styles/ihill/ckd4s0ptt1byo1hrlkjyn5zvy",
    accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
  });

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  map.on('load', () => {
    document.querySelector('.legend__wrapper').style.display = 'unset';
    const governmentInfo = {};
    const policyColorPalette = ["#4E1218","#973332","#F15B52"];
    const policyBoardColor = (value) => {
      if (value === "Select Board") {
        return policyColorPalette[0]
      } else if (value === "Selectmen") {
        return policyColorPalette[1]
      } else if ("Council") {
        return policyColorPalette[2]
      }
    }
    const policyColorExpression = ['match', ['get', 'town']];
    const legislativeColorPalette = ["#D59C29", "#FDB525", "#fcd78a", "#FBF9EE"]
    const legislativeColor = (value) => {
      if (value === "Aldermen") {
        return legislativeColorPalette[0]
      } else if (value === "Council") {
        return legislativeColorPalette[1]
      } else if ("Open Town Meeting") {
        return legislativeColorPalette[2]
      } else if ("Representative Town Meeting") {
        return legislativeColorPalette[3]
      }
    }
    const legislativeColorExpression = ['match', ['get', 'town']];
    const cmoColorPalette = ["#03332D", "#00613F", "#98D09A", "#F0F8F3"];
    const cmoColor = (value) => {
      if (value === "Town Administrator") {
        return cmoColorPalette[0]
      } else if (value === "Town Manager") {
        return cmoColorPalette[1]
      } else if (value === "Mayor") {
        return cmoColorPalette[2]
      } else {
        return cmoColorPalette[3]
      } 
    };
    const cmoColorExpression = ['match', ['get', 'town']];
    response.forEach((row) => {
      governmentInfo[`${row.TOWN}`] = row
      policyColorExpression.push(row.TOWN, row['Policy Board'] !== '' ? policyBoardColor(row['Policy Board']) : '#D1D6D6')
      legislativeColorExpression.push(row.TOWN, row['Legislative Body'] !== '' ? legislativeColor(row['Legislative Body']) : '#D1D6D6')
      cmoColorExpression.push(row.TOWN, row['Chief Municipal Official'] !== '' ? cmoColor(row['Chief Municipal Official']) : '#D1D6D6')
    });
    policyColorExpression.push('#D1D6D6');
    legislativeColorExpression.push('#D1D6D6');
    cmoColorExpression.push('#D1D6D6');
    map.addLayer({
      id: 'Muni choropleth',
      type: 'fill',
      source: 'composite',
      'source-layer': 'MA_Munis',
      paint: {
        'fill-color': policyColorExpression,
        'fill-outline-color': 'black',
      }
    })
    map.moveLayer('MA muni borders')
    map.moveLayer('MAPC outline')
    map.moveLayer('settlement-major-label')
    map.moveLayer('settlement-minor-label')

    map.on('click', 'Muni choropleth', (e) => {
      console.log(governmentInfo[`${e.features[0].properties.town}`])
      let policyBoard = governmentInfo[`${e.features[0].properties.town}`]['Policy Board'] !== '' ?
        governmentInfo[`${e.features[0].properties.town}`]['Policy Board'] 
        : 'Policy board type unknown'
      let legislativeBody = governmentInfo[`${e.features[0].properties.town}`]['Legislative Body'] !== '' ?
        governmentInfo[`${e.features[0].properties.town}`]['Legislative Body']
        : 'Legislative body unknown'
      let cmo = governmentInfo[`${e.features[0].properties.town}`]['Chief Municipal Official'] !== '' ?
      governmentInfo[`${e.features[0].properties.town}`]['Chief Municipal Official']
      : 'Chief Municipal Official unknown'
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`
          <p class="tooltip__title tooltip__title--datacommon">${e.features[0].properties.town}</p>
          <ul class='tooltip__list'>
          <li class="tooltip__text tooltip__text--datacommon">${policyBoard}</li>
          <li class="tooltip__text tooltip__text--datacommon">${legislativeBody}</li>
          <li class="tooltip__text tooltip__text--datacommon">${cmo}</li>
          </ul>
        `)
        .addTo(map);
    })

    document.querySelector('.legend__select').addEventListener("change", (e) => {
      switch(e.target.value) {
        case 'policy':
          document.querySelector('#legend__policy-board').style.display ="inline"
          document.querySelector('#legend__legislative-body').style.display ="none"
          document.querySelector('#legend__cmo').style.display ="none"
          map.setPaintProperty('Muni choropleth', 'fill-color', policyColorExpression)
          break;
        case 'legislative':
          document.querySelector('#legend__policy-board').style.display ="none"
          document.querySelector('#legend__legislative-body').style.display ="inline"
          document.querySelector('#legend__cmo').style.display ="none"
          map.setPaintProperty('Muni choropleth', 'fill-color', legislativeColorExpression)
          break;
        case 'cmo':
          document.querySelector('#legend__policy-board').style.display ="none"
          document.querySelector('#legend__legislative-body').style.display ="none"
          document.querySelector('#legend__cmo').style.display ="inline"
          map.setPaintProperty('Muni choropleth', 'fill-color', cmoColorExpression)

          break;
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
  document.querySelector('.legend').style.maxHeight = "188px";
  document.querySelector('.maximize-instructions').style.display = 'none';
  document.querySelector('.button__collapsible--minus').style.display = 'inline';
  document.querySelector('.button__collapsible--plus').style.display = 'none';
})
