---
layout: post
title:  "Town Hall Game"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper">
  <span class="legend__title"></span>
  <span class="legend__entry"></span>
  <p class="questions__controls">
    <button class="questions__controls--back" disabled>&#8592;</button>
    <button class="questions__controls--forward">&#8594;</button>
  </p>
</aside>

<link
rel="stylesheet"
href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css"
type="text/css"
/><script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.js"></script>
<script src="{{'assets/javascripts/town-halls-map.js' | absolute_url }}" type="module"></script>
<script src="https://npmcdn.com/@turf/turf@5.1.6/turf.min.js"></script>