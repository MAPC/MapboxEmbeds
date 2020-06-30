mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';
let zoom = 9;
let center = [-71.0408, 42.3317];
if (window.innerWidth <= 500) {
  zoom = 7.75;
  center = [-71.109, 42.356];
} else if (window.innerWidth <= 700) {
  zoom = 8.27;
  center = [-70.89, 42.369];
}

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ihill/ckbwj9b7t16h11htdrlq9ondi',
  center,
  zoom,
  minZoom: 6,
  maxZoom: 13,
  maxBounds: [
    [-74.728, 38.167], // Southwest bound
    [-66.541, 46.032], // Northeast bound
  ],
  preserveDrawingBuffer: true,
});




map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
map.addControl(new mapboxgl.GeolocateControl(), 'top-left');
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    bbox: [-73.613892, 41.199323, -69.631348, 42.960443], // Northeast bound
  }), 'top-left'
);
map.scrollZoom.disable();

map.on('load', () => {
  let activePanel = 'item1';
  map.setPaintProperty('Zone Types', 'fill-opacity', 1);
  map.setPaintProperty('MultiFamily Housing', 'fill-opacity', 0)
  map.setPaintProperty('DU per acre', 'fill-opacity', 0)
  map.setPaintProperty('Density Overlay - No impact', 'fill-opacity', 0)
  map.setPaintProperty('Density Overlay - Decreased density', 'fill-opacity', 0)
  map.setPaintProperty('Density Overlay - Increased Density', 'fill-opacity', 0)
  map.setPaintProperty('Effective FAR', 'fill-opacity', 0)
  document.onscroll = function(e) {
    var panels = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6']
    for (var i = 0; i < panels.length; i++) {
      var currentPanel = panels[i]
        if (isElementOnScreen(currentPanel)) {
          setActivePanel(currentPanel);
          break;
      }
    }
  };
  
  function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
  }
  

  function setActivePanel(currentPanel) {
    if (currentPanel === activePanel) return;
    document.getElementById(currentPanel).classList.add('panel--active')
    document.getElementById(activePanel).classList.remove('panel--active')
    if (currentPanel === 'item1') {
      map.setPaintProperty('Zone Types', 'fill-opacity', 1);
      map.setPaintProperty('MultiFamily Housing', 'fill-opacity', 0)
      map.setPaintProperty('DU per acre', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - No impact', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Decreased density', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Increased Density', 'fill-opacity', 0)
      map.setPaintProperty('Effective FAR', 'fill-opacity', 0)
    } else if (currentPanel === 'item2') {
      map.setPaintProperty('Zone Types', 'fill-opacity', 0);
      map.setPaintProperty('MultiFamily Housing', 'fill-opacity', 1)
      map.setPaintProperty('DU per acre', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - No impact', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Decreased density', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Increased Density', 'fill-opacity', 0)
      map.setPaintProperty('Effective FAR', 'fill-opacity', 0)
    } else if (currentPanel === 'item3') {
      map.setPaintProperty('Zone Types', 'fill-opacity', 0);
      map.setPaintProperty('MultiFamily Housing', 'fill-opacity', 0)
      map.setPaintProperty('DU per acre', 'fill-opacity', 1)
      map.setPaintProperty('Density Overlay - No impact', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Decreased density', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Increased Density', 'fill-opacity', 0)
      map.setPaintProperty('Effective FAR', 'fill-opacity', 0)
      map.flyTo({
        center: [-71.0408, 42.3317],
        zoom: 9,
        bearing: 0,
        speed: 1,
        curve: 1,
        easing: function(t) {
          return t;
        },
        essential: true
      })
    } else if (currentPanel === 'item4') {
      map.setPaintProperty('Zone Types', 'fill-opacity', 0);
      map.setPaintProperty('MultiFamily Housing', 'fill-opacity', 0)
      map.setPaintProperty('DU per acre', 'fill-opacity', 1)
      map.setPaintProperty('Density Overlay - No impact', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Decreased density', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Increased Density', 'fill-opacity', 0)
      map.setPaintProperty('Effective FAR', 'fill-opacity', 0)
      map.flyTo({
          center: [-71.0909, 42.3365],
          zoom: 11,
          bearing: 0,
          speed: 1, // make the flying slow
          curve: 1, // change the speed at which it zooms out
          easing: function(t) {
            return t;
          },
          essential: true
      })
    } else if (currentPanel === 'item5') {
      map.flyTo({
        center: [-71.0408, 42.3317],
        zoom: 9,
        bearing: 0,
        speed: 1, // make the flying slow
        curve: 1, // change the speed at which it zooms out
        easing: function(t) {
          return t;
        },
        essential: true
    })
      map.setPaintProperty('Zone Types', 'fill-opacity', 0);
      map.setPaintProperty('MultiFamily Housing', 'fill-opacity', 0)
      map.setPaintProperty('DU per acre', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - No impact', 'fill-opacity', 1)
      map.setPaintProperty('Density Overlay - Decreased density', 'fill-opacity', 1)
      map.setPaintProperty('Density Overlay - Increased Density', 'fill-opacity', 1)
      map.setPaintProperty('Effective FAR', 'fill-opacity', 0)

    } else if (currentPanel === 'item6') {
      map.setPaintProperty('Zone Types', 'fill-opacity', 0);
      map.setPaintProperty('MultiFamily Housing', 'fill-opacity', 0)
      map.setPaintProperty('DU per acre', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - No impact', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Decreased density', 'fill-opacity', 0)
      map.setPaintProperty('Density Overlay - Increased Density', 'fill-opacity', 0)
      map.setPaintProperty('Effective FAR', 'fill-opacity', 1)
    }
    activePanel = currentPanel;
  }
  
  document.querySelector('.print').addEventListener('click', (e) => {
    var img = map.getCanvas().toDataURL('image/png')
    document.querySelector('.print').href = img
  })
})
