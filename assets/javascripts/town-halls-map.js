d3.csv('/MapboxEmbeds/assets/data/towncityhalls.csv').then((response) => {
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
  const hallList = response.map((row) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [row.lng, row.lat],
      },
      properties: {
        muni: row.muni,
        muni_id: +row.muni_id,
        lng: +row.lng,
        lat: +row.lat,
      }
    }
  })

  townHallMap.on('load', () => {
    let muniIdToMatch = 35;
    townHallMap.addLayer({
      'id': 'town-halls',
      'type': 'symbol',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': hallList
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
    townHallMap.on('draw.create', calculateDistance);

    function calculateDistance() {
      console.log(draw.getSelected())
      const drawnCoords = draw.getAll().features[0].geometry.coordinates;
      const selectedTownHall = townHallMap.queryRenderedFeatures({
        filter: ["==", "muni_id", muniIdToMatch]
      });
      console.log(selectedTownHall)
      const townHallCoords = [selectedTownHall[0].properties.lng, selectedTownHall[0].properties.lat]
      const linestring = turf.lineString([townHallCoords, drawnCoords]);
      console.log(townHallCoords)
      console.log(drawnCoords)
      console.log(turf.length(linestring, {units: 'miles'}).toLocaleString())

      townHallMap.setPaintProperty('town-halls', 'icon-opacity', [
        "match",
        ["get", "muni_id"],
        [muniIdToMatch],
        1,
        0
      ])
    }
  });
});
