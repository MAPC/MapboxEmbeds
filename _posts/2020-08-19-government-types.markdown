---
layout: post
title:  "Calendar - Government Types"
description: "Click to view data visualization"
---

<main class="map__container">
  <div id="left-map" class="map map__comparison"></div>
  <div id="right-map" class="map map__comparison"></div>
</main>
<aside class="legend__wrapper legend__wrapper--datacommon" style="display: none;">
  <div class="legend" style="max-height: 291px;">
    <span class="legend__title legend__title--datacommon">Municipal Government Types</span>
    <select id="type" name="type" class="legend__select">
      <option value="policy" checked>Policy board</option>
      <option value="legislative">Legislative body</option>
      <option value="cmo">Chief municipal officer</option>
    </select>
    <svg height="104" width="160" id="legend__policy-board">
      <rect x="2" y="2" width="16" height="16" fill="#92C9ED" stroke="black" stroke-width="1px" />
      <text x="26" y="14" class="legend__entry legend__entry--datacommon">Selectmen</text>
      <rect x="2" y="30" width="16" height="16" fill="#3B66B0" stroke="black" stroke-width="1px"  />
      <text x="26" y="42" class="legend__entry legend__entry--datacommon">Select Board</text>
      <rect x="2" y="58" width="16" height="16" fill="#233069" stroke="black" stroke-width="1px"  />
      <text x="26" y="70" class="legend__entry legend__entry--datacommon">Council</text>
      <rect x="2" y="86" width="16" height="16" fill="#D1D6D6" stroke="black" stroke-width="1px"  />
      <text x="26" y="98" class="legend__entry legend__entry--datacommon">Unknown</text>
    </svg>
    <svg height="120" width="160" id="legend__legislative-body" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#92C9ED" stroke="black" stroke-width="1px" />
      <text x="26" y="14" class="legend__entry legend__entry--datacommon">Open Town Meeting</text>
      <rect x="2" y="30" width="16" height="16" fill="#3B66B0" stroke="black" stroke-width="1px"  />
      <text x="26" y="42" class="legend__entry legend__entry--datacommon">Council</text>
      <rect x="2" y="58" width="16" height="16" fill="#233069" stroke="black" stroke-width="1px"  />
      <text x="26" y="70" class="legend__entry legend__entry--datacommon">Representative</text>
      <text x="26" y="88" class="legend__entry legend__entry--datacommon">Town Meeting</text>
      <rect x="2" y="98" width="16" height="16" fill="#111436" stroke="black" stroke-width="1px"  />
      <text x="26" y="112" class="legend__entry legend__entry--datacommon">Aldermen</text>
    </svg>
    <svg height="134" width="160" id="legend__cmo" style="display:none;">
      <rect x="2" y="2" width="16" height="16" fill="#92C9ED" stroke="black" stroke-width="1px" />
      <text x="26" y="14" class="legend__entry legend__entry--datacommon">Town Administrator</text>
      <rect x="2" y="30" width="16" height="16" fill="#3B66B0" stroke="black" stroke-width="1px"  />
      <text x="26" y="42" class="legend__entry legend__entry--datacommon">Town Manager</text>
      <rect x="2" y="58" width="16" height="16" fill="#233069" stroke="black" stroke-width="1px"  />
      <text x="26" y="70" class="legend__entry legend__entry--datacommon">Mayor</text>
      <rect x="2" y="86" width="16" height="16" fill="#111436" stroke="black" stroke-width="1px"  />
      <text x="26" y="98" class="legend__entry legend__entry--datacommon">Other</text>
      <rect x="2" y="114" width="16" height="16" fill="#D1D6D6" stroke="black" stroke-width="1px"  />
      <text x="26" y="126" class="legend__entry legend__entry--datacommon">Unknown</text>
    </svg>
    <a href="https://datacommon.mapc.org/browser/datasets/413" target="_PARENT" class="legend__title legend__title--datacommon">Explore & Download Data</a>
  </div>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions legend__entry legend__entry--datacommon">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>
<script src="{{'assets/javascripts/government-map.js' | absolute_url }}" type="module"></script>
  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.js"></script>
<link
rel="stylesheet"
href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.css"
type="text/css"
/>