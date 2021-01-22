---
layout: post
title:  "February 2021: Housing Submarkets"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper legend__wrapper--datacommon">
  <div class="legend" style="max-height:330px;">
    <select id="type" name="type" class="legend__select">
      <option value="mhi" checked>Median Household Income</option>
      <option value="ch_rhu_p">Change in % Rented Housing Units</option>
    </select>
    <svg height="132" width="168">
      <rect x="2" y="2" width="16" height="16" fill="#F3F3F3" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">1 – 50</text>
      <rect x="2" y="30" width="16" height="16" fill="#B1C6D8" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">50 – 100</text>
      <rect x="2" y="58" width="16" height="16" fill="#50789D" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">100 – 200</text>
      <rect x="2" y="86" width="16" height="16" fill="#2e4b66" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">200+</text>
      <rect x="2" y="114" width="16" height="16" fill="#c1b9bb" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
  </div>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions legend__entry legend__entry--datacommon">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>

<script src="{{'assets/javascripts/housing-submarkets.js' | absolute_url }}" type="module"></script>