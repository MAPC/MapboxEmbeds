---
layout: post
title:  "July 2020 - Pollution Proximity Index"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper legend__wrapper--datacommon">
  <div class="legend" style="max-height: 360px;">
    <span class="legend__title legend__title--datacommon">Pollution Proximity Index (PPI)</span>
    <svg height="160" width="160">
      <rect x="2" y="2" width="32" height="16" fill="#FFFFFF" stroke="black" stroke-width="1px" />
      <text x="42" y="14" class="legend__entry legend__entry--datacommon">0</text>
      <rect x="2" y="30" width="32" height="16" fill="#fee5da" stroke="black" stroke-width="1px"  />
      <text x="42" y="42" class="legend__entry legend__entry--datacommon">1</text>
      <rect x="2" y="58" width="32" height="16" fill="#fdae95" stroke="black" stroke-width="1px"  />
      <text x="42" y="70" class="legend__entry legend__entry--datacommon">2</text>
      <rect x="2" y="86" width="32" height="16" fill="#fd6a52" stroke="black" stroke-width="1px"  />
      <text x="42" y="98" class="legend__entry legend__entry--datacommon">3</text>
      <rect x="2" y="114" width="32" height="16" fill="#e02d2f" stroke="black" stroke-width="1px"  />
      <text x="42" y="126" class="legend__entry legend__entry--datacommon">4</text>
      <rect x="2" y="142" width="32" height="16" fill="#74004b" stroke="black" stroke-width="1px"  />
      <text x="42" y="154" class="legend__entry legend__entry--datacommon">5</text>
    </svg>
    <span class="legend__title legend__title--datacommon">Additional features</span>
    <div class="toggle__group">
      <div class="toggle__wrapper">
        <label class="toggle__switch">
          <input type="checkbox" class="toggle__input toggle__input--borders" />
          <span class="toggle__circle"></span>
        </label>
        <span class="legend__entry legend__entry--datacommon">Municipal borders</span>
      </div>
      <div class="toggle__wrapper">
        <label class="toggle__switch">
          <input type="checkbox" class="toggle__input toggle__input--roads" />
          <span class="toggle__circle"></span>
        </label>
        <span class="legend__entry legend__entry--datacommon">Roads</span>
      </div>
    </div>
    <a href="https://datacommon.mapc.org/browser/datasets/413" target="_PARENT" class="legend__title legend__title--datacommon">Explore & Download Data</a>
  </div>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions legend__entry legend__entry--datacommon">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>

<script src="{{'assets/javascripts/ppi-map.js' | absolute_url }}" type="module"></script>