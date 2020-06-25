---
layout: post
title:  "West Station Results"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper legend__wrapper--datacommon">
  <div class="legend" style="max-height: 360px;">
    <span class="legend__title">Breakout Room</span>
    <svg height="190" width="160">
      <rect x="2" y="2" width="32" height="16" fill="#6e40aa" stroke="black" stroke-width="1px" />
      <text x="42" y="14" class="legend__entry" fill="#1F4E46">1</text>
      <rect x="2" y="30" width="32" height="16" fill="#df40a1" stroke="black" stroke-width="1px"  />
      <text x="42" y="42" class="legend__entry" fill="#1F4E46">2</text>
      <rect x="2" y="58" width="32" height="16" fill="#ff704e" stroke="black" stroke-width="1px"  />
      <text x="42" y="70" class="legend__entry" fill="#1F4E46">3</text>
      <rect x="2" y="86" width="32" height="16" fill="#d2c934" stroke="black" stroke-width="1px"  />
      <text x="42" y="98" class="legend__entry" fill="#1F4E46">4</text>
      <rect x="2" y="114" width="32" height="16" fill="#6bf75c" stroke="black" stroke-width="1px"  />
      <text x="42" y="126" class="legend__entry" fill="#1F4E46">5</text>
      <rect x="2" y="142" width="32" height="16" fill="#1bd9ac" stroke="black" stroke-width="1px"  />
      <text x="42" y="154" class="legend__entry" fill="#1F4E46">6</text>
      <rect x="2" y="170" width="32" height="16" fill="#3988e1" stroke="black" stroke-width="1px"  />
      <text x="42" y="182" class="legend__entry" fill="#1F4E46">7</text>
    </svg>
    <span class="legend__title">Display features</span>
    <div class="toggle__group">
      <div class="toggle__wrapper">
        <label class="toggle__switch">
          <input type="checkbox" class="toggle__input toggle__input--point" autocomplete="off" checked />
          <span class="toggle__circle"></span>
        </label>
        <span class="legend__entry">Points</span>
      </div>
      <div class="toggle__wrapper">
        <label class="toggle__switch">
          <input type="checkbox" class="toggle__input toggle__input--line" autocomplete="off" checked />
          <span class="toggle__circle"></span>
        </label>
        <span class="legend__entry">Lines</span>
      </div>
      <div class="toggle__wrapper">
        <label class="toggle__switch">
          <input type="checkbox" class="toggle__input toggle__input--polygon" autocomplete="off" checked />
          <span class="toggle__circle"></span>
        </label>
        <span class="legend__entry">Polygons</span>
      </div>
    </div>
  </div>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>
<script src="{{'assets/javascripts/weststation-map.js' | absolute_url }}" type="module"></script>