---
layout: post
title:  "COVID-19 Housing Assistance"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>

<div class="map__title-box">
  <h1 class="map__title">Estimated Housing Assistance Need After CARES Act Benefits End (Monthly)</h1>
  <h2 class="map__subtitle">Based on May 2nd Unemployment Claims</h2>
</div>
<aside class="legend__wrapper">
  <svg height="308" width="168" class="map__legend">
    <text x="12" y="24" class="legend__title">Estimated Housing</text>
    <text x="20" y="44" class="legend__title">Assistance Need</text>

    <rect x="2" y="56" width="16" height="16" fill="#ffffd9" stroke="#231F20"/>
    <text x="28" y="68" class="legend__entry" fill="#231F20">≤ $10,000</text>

    <rect x="2" y="84" width="16" height="16" fill="#edf8b1" stroke="#231F20"/>
    <text x="28" y="96" class="legend__entry" fill="#231F20">$10,001 – $50,000</text>

    <rect x="2" y="112" width="16" height="16" fill="#c7e9b4" stroke="#231F20"/>
    <text x="28" y="124" class="legend__entry" fill="#231F20">$50,001 – $100,000</text>

    <rect x="2" y="140" width="16" height="16" fill="#7fcdbb" stroke="#231F20"/>
    <text x="28" y="152" class="legend__entry" fill="#231F20">$100,001 – $250,000</text>

    <rect x="2" y="168" width="16" height="16" fill="#41b6c4" stroke="#231F20"/>
    <text x="28" y="180" class="legend__entry" fill="#231F20">$250,001 – $500,000</text>

    <rect x="2" y="196" width="16" height="16" fill="#1d91c0" stroke="#231F20"/>
    <text x="28" y="208" class="legend__entry" fill="#231F20">$500,001 – $1,000,000</text>

    <rect x="2" y="224" width="16" height="16" fill="#225ea8" stroke="#231F20"/>
    <text x="28" y="236" class="legend__entry" fill="#231F20">$1,000,001 – $3,500,000</text>

    <rect x="2" y="252" width="16" height="16" fill="#0c2c84" stroke="#231F20"/>
    <text x="28" y="264" class="legend__entry" fill="#231F20">$3,500,001 – $15,500,000</text>

    <rect x="2" y="280" width="16" height="16" fill="#e8e8e8" stroke="#231F20"/>
    <text x="28" y="292" class="legend__entry" fill="#231F20">Data unavailable</text>
  </svg>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>

</aside>
<script src="{{'assets/javascripts/housing-assistance-map.js' | absolute_url }}" type="module"></script>