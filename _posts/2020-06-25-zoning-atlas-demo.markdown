---
layout: post
title:  "Zoning Atlas Demo"
description: "Click to view data visualization"
---
<main>
  <aside class="sidebar">
    <div class="sidebar__item panel panel--active" id="item1">
      <h2 class="panel__title">Zone Types</h2>
      <p class="panel__content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed interdum orci, ac ornare eros. Donec imperdiet sapien eu turpis malesuada sagittis eu eu mi. Mauris varius felis id lorem fermentum, eu tristique dolor condimentum. Praesent molestie justo et condimentum finibus. Phasellus venenatis lacinia augue quis volutpat. Cras malesuada orci eget felis ultricies commodo. Donec varius feugiat mattis.</p>
    </div>
    <div class="sidebar__item panel" id="item2">
      <h2 class="panel__title">Multi-Family Housing</h2>
      <p class="panel__content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed interdum orci, ac ornare eros. Donec imperdiet sapien eu turpis malesuada sagittis eu eu mi. Mauris varius felis id lorem fermentum, eu tristique dolor condimentum. Praesent molestie justo et condimentum finibus. Phasellus venenatis lacinia augue quis volutpat. Cras malesuada orci eget felis ultricies commodo. Donec varius feugiat mattis.</p>
    </div>
    <div class="sidebar__item panel" id="item3">
      <h2 class="panel__title">Effective Dwelling Units per Acre</h2>
      <p class="panel__content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed interdum orci, ac ornare eros. Donec imperdiet sapien eu turpis malesuada sagittis eu eu mi. Mauris varius felis id lorem fermentum, eu tristique dolor condimentum. Praesent molestie justo et condimentum finibus. Phasellus venenatis lacinia augue quis volutpat. Cras malesuada orci eget felis ultricies commodo. Donec varius feugiat mattis.</p>
    </div>
    <div class="sidebar__item panel" id="item4">
      <h2 class="panel__title">Dwelling Units per Acre: ICC</h2>
      <p class="panel__content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed interdum orci, ac ornare eros. Donec imperdiet sapien eu turpis malesuada sagittis eu eu mi. Mauris varius felis id lorem fermentum, eu tristique dolor condimentum. Praesent molestie justo et condimentum finibus. Phasellus venenatis lacinia augue quis volutpat. Cras malesuada orci eget felis ultricies commodo. Donec varius feugiat mattis.</p>
    </div>
    <div class="sidebar__item panel" id="item5">
      <h2 class="panel__title">Density </h2>
      <p class="panel__content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed interdum orci, ac ornare eros. Donec imperdiet sapien eu turpis malesuada sagittis eu eu mi. Mauris varius felis id lorem fermentum, eu tristique dolor condimentum. Praesent molestie justo et condimentum finibus. Phasellus venenatis lacinia augue quis volutpat. Cras malesuada orci eget felis ultricies commodo. Donec varius feugiat mattis.</p>
    </div>
    <div class="sidebar__item panel" id="item6">
      <h2 class="panel__title">Effective FAR</h2>
      <p class="panel__content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed interdum orci, ac ornare eros. Donec imperdiet sapien eu turpis malesuada sagittis eu eu mi. Mauris varius felis id lorem fermentum, eu tristique dolor condimentum. Praesent molestie justo et condimentum finibus. Phasellus venenatis lacinia augue quis volutpat. Cras malesuada orci eget felis ultricies commodo. Donec varius feugiat mattis.</p>
    </div>
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