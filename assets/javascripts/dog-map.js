fetch('https://staging.datacommon.mapc.org/calendar/dogs')
  .then(response => response.json())
  .then(data => console.log(data))