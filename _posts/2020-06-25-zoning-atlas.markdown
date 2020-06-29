---
layout: post
title:  "Zoning Atlas"
description: "Click to view data visualization"
---
<main>
  <aside class="sidebar">
    <div class="sidebar__item" id="item1">First Item - Show dots</div>
    <div class="sidebar__item" id="item2">Second Item - Show Trails</div>
    <div class="sidebar__item" id="item3">Third Item - Show both</div>
  </aside>
  <div id="map" class="map"></div>
  <aside class="legend__wrapper">
    <a href="" download="map.png" class="print">Print</a>
  </aside>
</main>


<link
rel="stylesheet"
href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css"
type="text/css"
/>
<link rel="stylesheet" href="{{'/assets/css/zoning-atlas.css' | relative_url }}" type="text/css"/>
<script src="{{'assets/javascripts/zoning-map.js' | absolute_url }}" type="module"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>