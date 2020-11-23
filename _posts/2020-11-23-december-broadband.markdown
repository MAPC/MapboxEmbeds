---
layout: post
title:  "December 2020: Municipal Broadband"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<div class="map__overlays">
  <aside class="legend__wrapper">
    <div class="legend" style="max-height:330px;">
      <span class="legend__title">Median Download Speed (Mbps), 2020</span>
        <svg height="250" width="168">
          <rect x="2" y="2" width="16" height="16" fill="#ffffd9" stroke="#231F20"/>
          <text x="28" y="14" class="legend__entry" fill="#231F20">0 – 50</text>
          <rect x="2" y="30" width="16" height="16" fill="#edf8b1" stroke="#231F20"/>
          <text x="28" y="42" class="legend__entry" fill="#231F20">51 – 100</text>
          <rect x="2" y="58" width="16" height="16" fill="#c7e9b4" stroke="#231F20"/>
          <text x="28" y="70" class="legend__entry" fill="#231F20">101 – 200</text>
          <rect x="2" y="86" width="16" height="16" fill="#7fcdbb" stroke="#231F20"/>
          <text x="28" y="98" class="legend__entry" fill="#231F20">201 – 350</text>
          <rect x="2" y="114" width="16" height="16" fill="#41b6c4" stroke="#231F20"/>
          <text x="28" y="126" class="legend__entry" fill="#231F20">Data unavailable</text>
        </svg>
    </div>
    <button type="button" class="button__collapsible button__collapsible--minus">-</button>
    <div>
      <label for="button__collapsible--plus" class="maximize-instructions">Expand legend</label>
      <button type="button" class="button__collapsible button__collapsible--plus">+</button>
    </div>
  </aside>
</div>

<script src="{{'assets/javascripts/broadband-map.js' | absolute_url }}" type="module"></script>