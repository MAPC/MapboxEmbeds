const questionText = document.querySelector('.legend__title');
const answerText = document.querySelector('.legend__entry');
const backButton = document.querySelector('.questions__controls--back');
const forwardButton = document.querySelector('.questions__controls--forward');
backButton.disabled = true;

d3.csv('/MapboxEmbeds/assets/data/towncityhalls.csv').then((response) => {
  const halls = {};
  response.forEach((row) => {
    halls[`${row.muni_id}`] = {
        muni: row.muni,
        muni_type: row.muni_type,
        muni_id: +row.muni_id,
        lng: +row.lng,
        lat: +row.lat,
    }
  });
  const muniIds = response.map((row) => +row.muni_id);
  let muniIndex = 0;
  let selectedMuni = halls[`${muniIds[muniIndex]}`];

  let zoom = 9;
  let center = [-71.0408, 42.3317];
  if (window.innerWidth <= 500) {
    zoom = 7.75;
    center = [-71.109, 42.356];
  } else if (window.innerWidth <= 700) {
    zoom = 8.27;
    center = [-70.89, 42.369];
  }
  const townHallMap = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ihill/ckbtlib0k0zrq1io0rf4viev8',
    center,
    zoom,
    minZoom: 6,
    maxZoom: 13,
    maxBounds: [
      [-74.728, 38.167], // Southwest bound
      [-66.541, 46.032], // Northeast bound
    ],
    accessToken: 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg',
  });
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {}
  });
  const scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
  });
  townHallMap.addControl(draw);
  townHallMap.addControl(scale);
  scale.setUnit('imperial');
  const featureList = response.map((row) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [row.lng, row.lat],
      },
      properties: {
        muni: row.muni,
        muni_id: +row.muni_id,
        muni_type: row.muni_type,
        lng: +row.lng,
        lat: +row.lat,
      }
    }
  })
  questionText.innerText = `Where is ${selectedMuni.muni}'s ${selectedMuni.muni_type} Hall?`;

  townHallMap.on('load', () => {
    townHallMap.resize();
    townHallMap.addLayer({
      'id': 'town-halls',
      'type': 'symbol',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': featureList
        }
      },
      'layout': {
        'icon-image': 'town-hall-15',
      },
      'paint': {
        'icon-opacity': 0,
      }
    });

    draw.changeMode('draw_point');
    townHallMap.on('draw.create', () => {
      const distance = turf.length(turf.lineString([[selectedMuni.lng, selectedMuni.lat], draw.getAll().features[0].geometry.coordinates]), {units: 'miles'});
      answerText.innerText = `Your guess: ${distance.toLocaleString()} miles off`;
      townHallMap.setPaintProperty('town-halls', 'icon-opacity', ["match", ["get", "muni_id"], [selectedMuni.muni_id], 1, 0]);
    });
  });

  document.querySelector('.questions__controls').addEventListener('click', (e) => {
    if (e.target.className === 'questions__controls--back') {
      selectedMuni = halls[`${muniIds[--muniIndex]}`];
      draw.deleteAll();
      draw.changeMode('draw_point');
      townHallMap.setPaintProperty('town-halls', 'icon-opacity', 0);
      questionText.innerText = `Where is ${selectedMuni.muni}'s ${selectedMuni.muni_type} Hall?`;
      answerText.innerText = '';

    } else if (e.target.className === 'questions__controls--forward') {
      selectedMuni = halls[`${muniIds[++muniIndex]}`];
      draw.deleteAll();
      draw.changeMode('draw_point');
      townHallMap.setPaintProperty('town-halls', 'icon-opacity', 0);
      questionText.innerText = `Where is ${selectedMuni.muni}'s ${selectedMuni.muni_type} Hall?`;
      answerText.innerText = '';
    }

    if (muniIndex == 0) {
      backButton.disabled = true;
      forwardButton.disabled = false;
    } else if (muniIndex >= muniIds.length - 1) {
      backButton.disabled = false;
      forwardButton.disabled = true;
    } else {
      backButton.disabled = false;
      forwardButton.disabled = false;
    }
  })
});
