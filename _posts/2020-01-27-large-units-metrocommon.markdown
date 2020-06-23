---
layout: post
title:  "MetroCommon - Large Units map"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<div class="map__title-box">
  <h1 class="map__title">Family Sized Housing Units</h1>
</div>
<aside class="legend__wrapper">
  <svg height='188' width='160' class='legend'>
    <rect x='10' y='11' width='16' height='16' style='fill:#0097c4; stroke: black; stroke-width: 1px;'></rect>
    <text x='32' y='23' class='legend__entry'>0%-25%</text>
    <rect x='10' y='39' width='16' height='16' style='fill:#3b66b0; stroke: black; stroke-width: 1px;'></rect>
    <text x='32' y='50' class='legend__entry'>26%-50%</text>
    <rect x='10' y='67' width='16' height='16' style='fill:#233069; stroke: black; stroke-width: 1px;'></rect>
    <text x='32' y='79' class='legend__entry'>51%-75%</text>
    <rect x='10' y='95' width='16' height='16' style='fill:#111436; stroke: black; stroke-width: 1px;'></rect>
    <text x='32' y='107' class='legend__entry'>76%-100%</text>
    <rect x='10' y='123' width='16' height='16' style='fill:#B57F00; stroke: black; stroke-width: 1px;'></rect>
    <text x='32' y='135' class='legend__entry'>Data unavailable</text>
    <rect x='10' y='151' width='16' height='16' style='fill:black; stroke: black; stroke-width: 1px;'></rect>
    <line x1='10' y1='159' x2='18' y2='151' style='stroke: #CFCECC;'></line>
    <line x1='10' y1='167' x2='26' y2='151' style='stroke: #CFCECC;'></line>
    <line x1='18' y1='167' x2='26' y2='159' style='stroke: #CFCECC;'></line>
    <text x='32' y='163' class='legend__entry'>High margin of error</text>
  </svg>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>

<script src="{{'assets/javascripts/large-units-border-map.js' | absolute_url }}" type="module"></script>