---
layout: post
title:  "UPDATE: COVID-19 Housing Assistance"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<div class="map__overlays">
  <div class="map__title-box">
    <h1 class="map__title">Estimated Housing Assistance Need After CARES Act Benefits End (Monthly)</h1>
    <h2 class="map__subtitle">Based on May 2nd Unemployment Claims</h2>
  </div>
  <aside class="legend__wrapper">
    <div class="legend" style="max-height:330px;">
      <span class="legend__title">Estimated Housing Assistance Need</span>
        <svg height="250" width="168">
          <rect x="2" y="2" width="16" height="16" fill="#ffffd9" stroke="#231F20"/>
          <text x="28" y="14" class="legend__entry" fill="#231F20">≤ $10,000</text>
          <rect x="2" y="30" width="16" height="16" fill="#edf8b1" stroke="#231F20"/>
          <text x="28" y="42" class="legend__entry" fill="#231F20">$10,001 – $50,000</text>
          <rect x="2" y="58" width="16" height="16" fill="#c7e9b4" stroke="#231F20"/>
          <text x="28" y="70" class="legend__entry" fill="#231F20">$50,001 – $100,000</text>
          <rect x="2" y="86" width="16" height="16" fill="#7fcdbb" stroke="#231F20"/>
          <text x="28" y="98" class="legend__entry" fill="#231F20">$100,001 – $250,000</text>
          <rect x="2" y="114" width="16" height="16" fill="#41b6c4" stroke="#231F20"/>
          <text x="28" y="126" class="legend__entry" fill="#231F20">$250,001 – $500,000</text>
          <rect x="2" y="142" width="16" height="16" fill="#1d91c0" stroke="#231F20"/>
          <text x="28" y="154" class="legend__entry" fill="#231F20">$500,001 – $1,000,000</text>
          <rect x="2" y="170" width="16" height="16" fill="#225ea8" stroke="#231F20"/>
          <text x="28" y="182" class="legend__entry" fill="#231F20">$1,000,001 – $3,500,000</text>
          <rect x="2" y="198" width="16" height="16" fill="#0c2c84" stroke="#231F20"/>
          <text x="28" y="210" class="legend__entry" fill="#231F20">$3,500,001 – $15,500,000</text>
          <rect x="2" y="226" width="16" height="16" fill="#e8e8e8" stroke="#231F20"/>
          <text x="28" y="238" class="legend__entry" fill="#231F20">Data unavailable</text>
        </svg>
    </div>
    <button type="button" class="button__collapsible button__collapsible--minus">-</button>
    <div>
      <label for="button__collapsible--plus" class="maximize-instructions">Expand legend</label>
      <button type="button" class="button__collapsible button__collapsible--plus">+</button>
    </div>
  </aside>
</div>

<script src="{{'assets/javascripts/updated-housing-assistance-map.js' | absolute_url }}" type="module"></script>