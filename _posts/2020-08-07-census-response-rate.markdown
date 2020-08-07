---
layout: post
title:  "September 2020 - Census Response Rates"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper legend__wrapper--datacommon">
  <div class="legend" style="max-height: 360px;">
    <span class="legend__title legend__title--datacommon">Census Response Rates</span>
    <!-- <p>This product uses the Census Bureau Data API but is not endorsed or certified by the Census Bureau.</p> -->
    <svg height="160" width="160">
      <rect x="2" y="2" width="32" height="16" fill="#FFFFFF" stroke="black" stroke-width="1px" />
      <text x="42" y="14" class="legend__entry">0</text>
      <rect x="2" y="30" width="32" height="16" fill="#fee5da" stroke="black" stroke-width="1px"  />
      <text x="42" y="42" class="legend__entry">1</text>
      <rect x="2" y="58" width="32" height="16" fill="#fdae95" stroke="black" stroke-width="1px"  />
      <text x="42" y="70" class="legend__entry">2</text>
      <rect x="2" y="86" width="32" height="16" fill="#fd6a52" stroke="black" stroke-width="1px"  />
      <text x="42" y="98" class="legend__entry">3</text>
      <rect x="2" y="114" width="32" height="16" fill="#e02d2f" stroke="black" stroke-width="1px"  />
      <text x="42" y="126" class="legend__entry">4</text>
      <rect x="2" y="142" width="32" height="16" fill="#74004b" stroke="black" stroke-width="1px"  />
      <text x="42" y="154" class="legend__entry">5</text>
    </svg>
    <a href="https://datacommon.mapc.org/browser/datasets/413" target="_PARENT" class="legend__title legend__title--datacommon">Explore & Download Data</a>
  </div>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions legend__entry legend__entry--datacommon">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>

<script src="{{'assets/javascripts/census-response-map.js' | absolute_url }}" type="module"></script>