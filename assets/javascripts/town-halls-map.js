mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';
d3.csv('/MapboxEmbeds/assets/data/towncityhalls.csv')
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
  console.log(response)
  

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
  });


  townHallMap.on('load', () => {
    const hallList = response.map((row) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [row.lng, row.lat],
        },
        properties: {
          muni: row.muni,
          muni_id: row.muni_id,
          lng: +row.lng,
          lat: +row.lat,
        }
      }
    })

    townHallMap.addLayer({
      'id': 'points',
      'type': 'circle',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': hallList
        }
      },
      'paint': {
        'circle-color': 'red',
        'circle-radius': 5,
      }
    });

    var draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        point: true,
        trash: true
      }
    });

    townHallMap.addControl(draw)
    var scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'imperial'
      });
      townHallMap.addControl(scale);
       
      scale.setUnit('imperial');
    townHallMap.on('draw.create', updateArea);


    function updateArea(e) {
      const drawnCoords = draw.getAll().features[0].geometry.coordinates;
      const selectedTownHall = townHallMap.queryRenderedFeatures({
        filter: ["==", "muni_id", "35"]
      });
      const townHallCoords = [selectedTownHall[0].properties.lng, selectedTownHall[0].properties.lat]
      const linestring = turf.lineString([townHallCoords, drawnCoords]);
      console.log(townHallCoords)
      console.log(drawnCoords)
      console.log(turf.length(linestring, {units: 'miles'}).toLocaleString())  

    }
  });
});
