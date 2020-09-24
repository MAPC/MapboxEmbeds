mapboxgl.accessToken = 'pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg';

const colorPalette = ['#3b66b0', '#9cacd6', '#a28fba', '#472b78', '#2C003B']
const colorExpression = ['match', ['get', 'town']];
const polygonColor = (value) => {
  if (value >= 30) {
    console.log("!")
    return colorPalette[4]
  } else if (value >= 20) {
    console.log("?")
    return colorPalette[3]
  } else if (value >= 15) {
    return colorPalette[2]
  } else if (value >= 10) {
    return colorPalette[1]
  }
  return colorPalette[0]
}

const dogInfo = {};

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

fetch('https://staging.datacommon.mapc.org/calendar/dogs')
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    const neighborhoodSwap = {
      "Turners Falls": "Monatgue",
      "Nutting Lake": "Billerica",
      "Centerville": "Barnstable",
      "Cherry Valley": "Leicester",
      "Vineyard Haven": "Tisbury"
    }
    const reducedData = data.reduce((munis, dog) => {
      // Need to handle bucketing these 5 neighborhoods into proper town bucket
      if (dog.contact.address.state === 'MA' && !Object.keys(neighborhoodSwap).includes(dog.contact.address.city)) {
        let muni = munis.find(row => row.muni === dog.contact.address.city)
        if (!muni) {
          muni = {
            muni: dog.contact.address.city,
            state: dog.contact.address.state,
            dogs: []
          }
          munis.push(muni)
        }
        muni.dogs.push(dog)
      }
      return munis
    }, [])

    console.log(reducedData)

    reducedData.forEach((row) => {
      dogInfo[`${row.muni}`] = row
      colorExpression.push(row.muni.toUpperCase(), polygonColor(row.dogs.length))
    });
    colorExpression.push(colorPalette[4])
    console.log(colorExpression)
    map.on('load', () => {
      document.querySelector('.legend__wrapper').style.display = 'unset';
      // map.setPaintProperty('background', 'background-color', '#FCF2FB');
      // map.setPaintProperty('External State', 'fill-color', '#FCF2FB');
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
    })
  })