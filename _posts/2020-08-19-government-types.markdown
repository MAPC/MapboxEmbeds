---
layout: post
title:  "Calendar - Government Types"
description: "Click to view data visualization"
---

<main class="map__container">
  <div id="left-map" class="map map__comparison"></div>
  <div id="right-map" class="map map__comparison"></div>
</main>

<div class="map__overlays">
  <div class="map__title-box map__title-box--datacommon" style="display: none;">
    <p class="legend__title legend__title--datacommon" id="muni"></p>
    <ul class="tooltip__list">
      <li class="legend__entry legend__entry--datacommon" id="entry18"></li>
      <li class="legend__entry legend__entry--datacommon" id="entry19"></li>
    </ul>
  </div>
  <aside class="legend__wrapper legend__wrapper--datacommon" style="display: none;">
    <div class="legend" style="max-height: 300px;">
      <span class="legend__title legend__title--datacommon">Municipal Government Types</span>
      <select id="type" name="type" class="legend__select">
        <option value="policy" checked>Policy board</option>
        <option value="legislative">Legislative body</option>
        <option value="cmo">Chief municipal official</option>
      </select>
      <svg height="164" width="160" id="legend__policy-board">
        <rect x="2" y="2" width="16" height="16" fill="#3b66b0" stroke="black" stroke-width="1px" />
        <text x="26" y="14" class="legend__entry legend__entry--datacommon">Select Board</text>
        <rect x="2" y="30" width="16" height="16" fill="#9cacd6" stroke="black" stroke-width="1px"  />
        <text x="26" y="42" class="legend__entry legend__entry--datacommon">Selectmen</text>
        <rect x="2" y="58" width="16" height="16" fill="#a28fba" stroke="black" stroke-width="1px"  />
        <text x="26" y="70" class="legend__entry legend__entry--datacommon">Council</text>
        <rect x="2" y="86" width="16" height="16" fill="#472b78" stroke="black" stroke-width="1px"  />
        <text x="26" y="98" class="legend__entry legend__entry--datacommon">No policy board</text>
        <rect x='2' y='114' width='16' height='16' fill="#472b78" style='stroke: black; stroke-width: 1px;'></rect>
        <circle cx='10' cy='122' r='5.5' fill='#f5f5f5'></circle>
        <text x='26' y='126' class='legend__entry legend__entry--datacommon'>3-member board</text>
        <rect x='2' y='142' width='16' height='16' fill="#472b78" style='stroke: black; stroke-width: 1px;'></rect>
        <line x1='2' y1='150' x2='10' y2='142' style='stroke: #f5f5f5;' stroke-width="1.5px"></line>
        <line x1='2' y1='158' x2='18' y2='142' style='stroke: #f5f5f5;' stroke-width="1.5px"></line>
        <line x1='10' y1='158' x2='18' y2='150' style='stroke: #f5f5f5;' stroke-width="1.5px"></line>
        <text x='26' y='154' class='legend__entry legend__entry--datacommon'>5-member board</text>
      </svg>
      <svg height="120" width="160" id="legend__legislative-body" style="display:none;">
        <rect x="2" y="2" width="16" height="16" fill="#3b66b0" stroke="black" stroke-width="1px" />
        <text x="26" y="14" class="legend__entry legend__entry--datacommon">Representative</text>
        <text x="26" y="32" class="legend__entry legend__entry--datacommon">Town Meeting</text>
        <rect x="2" y="42" width="16" height="16" fill="#9cacd6" stroke="black" stroke-width="1px"  />
        <text x="26" y="56" class="legend__entry legend__entry--datacommon">Open Town Meeting</text>
        <rect x="2" y="70" width="16" height="16" fill="#a28fba" stroke="black" stroke-width="1px"  />
        <text x="26" y="84" class="legend__entry legend__entry--datacommon">Aldermen</text>
        <rect x="2" y="98" width="16" height="16" fill="#472b78" stroke="black" stroke-width="1px"  />
        <text x="26" y="112" class="legend__entry legend__entry--datacommon">Council</text>
      </svg>
      <svg height="132" width="160" id="legend__cmo" style="display:none;">
        <rect x="2" y="2" width="16" height="16" fill="#3B66B0" stroke="black" stroke-width="1px" />
        <text x="26" y="14" class="legend__entry legend__entry--datacommon">Town Administrator</text>
        <rect x="2" y="30" width="16" height="16" fill="#9cacd6" stroke="black" stroke-width="1px"  />
        <text x="26" y="42" class="legend__entry legend__entry--datacommon">Town Manager</text>
        <rect x="2" y="58" width="16" height="16" fill="#a28fba" stroke="black" stroke-width="1px"  />
        <text x="26" y="70" class="legend__entry legend__entry--datacommon">Mayor</text>
        <rect x="2" y="86" width="16" height="16" fill="#472b78" stroke="black" stroke-width="1px"  />
        <text x="26" y="98" class="legend__entry legend__entry--datacommon">Chair of Select Board</text>
        <rect x="2" y="114" width="16" height="16" fill='#2C003B' stroke="black" stroke-width="1px"  />
        <text x="26" y="126" class="legend__entry legend__entry--datacommon">Other</text>
      </svg>
      <span class="legend__title legend__title--datacommon">Explore & Download Data</span>
      <ul class="tooltip__list">
        <li class="legend__entry legend__entry--datacommon"><a href="https://www.mma.org/resource/form-of-government-for-each-community-in-massachusetts/muni_forms_of_gov2018/" target="_PARENT">2018–2019 data (PDF)</a></li>
        <li class="legend__entry legend__entry--datacommon"><a href="https://www.mma.org/resource/form-of-government-for-each-community-in-massachusetts/formsofgov2019-2020massmunidirectory/" target="_PARENT">2019–2020 data (PDF)</a></li>
      </ul>
    </div>
    <button type="button" class="button__collapsible button__collapsible--minus">-</button>
    <div>
      <label for="button__collapsible--plus" class="maximize-instructions legend__entry legend__entry--datacommon">Expand legend</label>
      <button type="button" class="button__collapsible button__collapsible--plus">+</button>
    </div>
  </aside>
</div>
<script src="{{'assets/javascripts/government-map.js' | absolute_url }}" type="module"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.css" type="text/css" />