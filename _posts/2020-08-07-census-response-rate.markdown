---
layout: post
title:  "September 2020 - Census Response Rates"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper legend__wrapper--datacommon">
  <div class="legend" style="max-height: 309px;">
    <span class="legend__title legend__title--datacommon">Census Response Rates (September 30, 2020)</span>
    <svg height="160" width="160">
      <rect x="2" y="2" width="32" height="16" fill="#feedde" stroke="black" stroke-width="1px" />
      <text x="42" y="14" class="legend__entry legend__entry--datacommon">80%+</text>
      <rect x="2" y="30" width="32" height="16" fill="#fdbe85" stroke="black" stroke-width="1px"  />
      <text x="42" y="42" class="legend__entry legend__entry--datacommon">70–⁠79%</text>
      <rect x="2" y="58" width="32" height="16" fill="#fd8d3c" stroke="black" stroke-width="1px"  />
      <text x="42" y="70" class="legend__entry legend__entry--datacommon">60–⁠69%</text>
      <rect x="2" y="86" width="32" height="16" fill="#e6550d" stroke="black" stroke-width="1px"  />
      <text x="42" y="98" class="legend__entry legend__entry--datacommon">50–⁠59%</text>
      <rect x="2" y="114" width="32" height="16" fill="#a63603" stroke="black" stroke-width="1px"  />
      <text x="42" y="126" class="legend__entry legend__entry--datacommon">≤ 49%</text>
      <rect x="2" y="142" width="32" height="16" fill="#636363" stroke="black" stroke-width="1px"  />
      <text x="42" y="154" class="legend__entry legend__entry--datacommon">Data unavailable</text>
    </svg>
    <a href="https://www2.census.gov/programs-surveys/decennial/2020/data/2020map/2020/" target="_PARENT" class="legend__title legend__title--datacommon">Explore & Download Data</a>
    <p class="legend__disclaimer legend__disclaimer--datacommon">This product uses the Census Bureau Data API but is not endorsed or certified by the Census Bureau.</p>
  </div>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions legend__entry legend__entry--datacommon">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>

<script src="{{'assets/javascripts/census-response-map.js' | absolute_url }}" type="module"></script>