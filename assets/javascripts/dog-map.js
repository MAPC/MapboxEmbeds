const colorPalette = ["#233069", "#0097C4", "#92C9ED", "#C4E7EB", "#fecd6d"]
const colorExpression = ['match', ['get', 'town']];
const polygonColor = (value) => {
  if (value >= 10) {
    return colorPalette[0]
  } else if (value >= 7) {
    return colorPalette[1]
  } else if (value >= 4) {
    return colorPalette[2]
  } else {
    return colorPalette[3]
  }
}

let zoom = 9;
let center = [-71.0408, 42.3317];
if (window.innerWidth <= 500) {
  zoom = 7.75;
  center = [-71.109, 42.356];
} else if (window.innerWidth <= 700) {
  zoom = 8.27;
  center = [-70.89, 42.369];
}

fetch('https://datacommon.mapc.org/calendar/dogs')
  .then(response => response.json())
  .then((data) => {
    const map = new mapboxgl.Map({
      container: 'map',
      zoom,
      minZoom: 6,
      maxZoom: 13,
      center,
      maxBounds: [
        [-74.728, 38.167], // Southwest bound
        [-66.541, 46.032], // Northeast bound
      ],
      style: "mapbox://styles/ihill/ckcnnn63u26o11ip2qf4odwyp",
      accessToken: "pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg",
    });
    console.log(data)
    
    const neighborhoodSwap = {
      "Turners Falls": "Montague",
      "Nutting Lake": "Billerica",
      "Centerville": "Barnstable",
      "Cherry Valley": "Leicester",
      "Vineyard Haven": "Tisbury"
    }
    const starterArray = [{
      muni: "Montague",
      dogs: []
    }, {
      muni: "Billerica",
      dogs: []
    }, {
      muni: "Barnstable",
      dogs: []
    }, {
      muni: "Leicester",
      dogs: []
    }, {
      muni: "Tisbury",
      dogs: []
    },
  ]
    const reducedData = data.reduce((munis, dog) => {
      if (dog.contact.address.state === 'MA') {
        if (!Object.keys(neighborhoodSwap).includes(dog.contact.address.city)) {
          let muni = munis.find(row => row.muni === dog.contact.address.city)
          if (!muni) {
            muni = {
              muni: dog.contact.address.city,
              dogs: []
            }
            munis.push(muni)
          }
          muni.dogs.push(dog)
        } else {
          let muni = munis.find(row => row.muni === neighborhoodSwap[dog.contact.address.city])
          muni.dogs.push(dog)
        }
      }
      return munis
    }, starterArray)

    console.log(reducedData)
    const dogInfo = {};
    reducedData.forEach((row) => {
      dogInfo[`${row.muni}`] = row
      colorExpression.push(row.muni.toUpperCase(), polygonColor(row.dogs.length))
    });
    colorExpression.push(colorPalette[4])
    
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
    map.on('load', () => {
      document.querySelector('.legend__wrapper').style.display = 'unset';
      map.setPaintProperty('background', 'background-color', '#fff5e0');
      map.setPaintProperty('External State', 'fill-color', '#fff5e0');
      map.addLayer({
        id: 'Muni choropleth',
        type: 'fill',
        source: 'composite',
        'source-layer': 'MA_Munis',
        paint: {
          'fill-color': colorExpression,
        }
      })
      map.moveLayer('Muni borders')
      map.moveLayer('MAPC outline')

      map.on('click', 'Muni choropleth', (e) => {
        const muni = toCamelCase(e.features[0].properties.town)
        if (dogInfo[muni]) {
          const i = getRandomIndex(dogInfo[muni].dogs.length)
          const selectedDog = dogInfo[muni].dogs[i]
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <p class="tooltip__title tooltip__title--datacommon">${muni} (${dogInfo[muni].dogs.length} available dogs)</p>
              <img class="tooltip__image" src="${selectedDog.primary_photo_cropped.small}" />
              <br/><a href="${selectedDog.url}" class="tooltip__text tooltip__text--datacommon">Meet ${selectedDog.name}!</a>
            `)
            .addTo(map);
        } else {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <p class="tooltip__title tooltip__title--datacommon">${muni}</p>
              <p class="tooltip__text tooltip__text--datacommon">No dogs listed</p>
            `)
            .addTo(map);
        }
      })
    })
  })

  document.querySelector('.button__collapsible--minus').addEventListener('click', () => {
    document.querySelector('.legend').style.maxHeight = "0";
    document.querySelector('.maximize-instructions').style.display = 'inline';
    document.querySelector('.button__collapsible--plus').style.display = 'inline';
    document.querySelector('.button__collapsible--minus').style.display = 'none';
  })
  
  document.querySelector('.button__collapsible--plus').addEventListener('click', () => {
    document.querySelector('.legend').style.maxHeight = "200px";
    document.querySelector('.maximize-instructions').style.display = 'none';
    document.querySelector('.button__collapsible--minus').style.display = 'inline';
    document.querySelector('.button__collapsible--plus').style.display = 'none';
  })

function toCamelCase(muniName) {
  return muniName.split(" ")
    .map((word) => word.charAt(0).concat(word.slice(1).toLowerCase()))
    .join(' ');
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}