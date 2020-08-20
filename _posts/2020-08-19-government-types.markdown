---
layout: post
title:  "Calendar - Government Types"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper legend__wrapper--datacommon" style="display: none;">
  <div class="legend" style="max-height: 360px;">
    <span class="legend__title legend__title--datacommon">Municipal Government Types</span>
    <select id="type" name="type" class="legend__select">
      <option value="policy" checked>Policy board</option>
      <option value="legislative">Legislative body</option>
      <option value="cmo">Chief municipal officer</option>
    </select>
    <span class="legend__title legend__title--datacommon">Year</span>
    <select id="year" name="year" class="legend__select">
      <option value="2019" checked>2019–⁠2020</option>
      <option value="2018">2018–⁠2019</option>
    </select>
    <svg height="104" width="160" id="legend__policy-board" style="display: none;">
      <rect x="2" y="2" width="32" height="16" fill="#4E1218" stroke="black" stroke-width="1px" />
      <text x="42" y="14" class="legend__entry legend__entry--datacommon">Select Board</text>
      <rect x="2" y="30" width="32" height="16" fill="#973332" stroke="black" stroke-width="1px"  />
      <text x="42" y="42" class="legend__entry legend__entry--datacommon">Selectmen</text>
      <rect x="2" y="58" width="32" height="16" fill="#F15B52" stroke="black" stroke-width="1px"  />
      <text x="42" y="70" class="legend__entry legend__entry--datacommon">Council</text>
      <rect x="2" y="86" width="32" height="16" fill="#D1D6D6" stroke="black" stroke-width="1px"  />
      <text x="42" y="98" class="legend__entry legend__entry--datacommon">Unknown</text>
    </svg>
    <svg height="134" width="160" id="legend__legislative-body">
      <rect x="2" y="2" width="32" height="16" fill="#D59C29" stroke="black" stroke-width="1px" />
      <text x="42" y="14" class="legend__entry legend__entry--datacommon">Aldermen</text>
      <rect x="2" y="30" width="32" height="16" fill="#FDB525" stroke="black" stroke-width="1px"  />
      <text x="42" y="42" class="legend__entry legend__entry--datacommon">Council</text>
      <rect x="2" y="58" width="32" height="16" fill="#fcd78a" stroke="black" stroke-width="1px"  />
      <text x="42" y="70" class="legend__entry legend__entry--datacommon">Open Town Meeting</text>
      <text x="42" y="86" class="legend__entry legend__entry--datacommon">Meeting</text>
      <rect x="2" y="104" width="32" height="16" fill="#FBF9EE" stroke="black" stroke-width="1px"  />
      <text x="42" y="112" class="legend__entry legend__entry--datacommon">Representative</text>
      <text x="42" y="128" class="legend__entry legend__entry--datacommon">Town Meeting</text>
    </svg>
    <svg height="134" width="160" id="legend__cmo" style="display:none;">
      <rect x="2" y="2" width="32" height="16" fill="#03332D" stroke="black" stroke-width="1px" />
      <text x="42" y="14" class="legend__entry legend__entry--datacommon">Town Administrator</text>
      <rect x="2" y="30" width="32" height="16" fill="#00613F" stroke="black" stroke-width="1px"  />
      <text x="42" y="42" class="legend__entry legend__entry--datacommon">Town Manager</text>
      <rect x="2" y="58" width="32" height="16" fill="#98D09A" stroke="black" stroke-width="1px"  />
      <text x="42" y="70" class="legend__entry legend__entry--datacommon">Mayor</text>
      <rect x="2" y="86" width="32" height="16" fill="#F0F8F3" stroke="black" stroke-width="1px"  />
      <text x="42" y="98" class="legend__entry legend__entry--datacommon">Other</text>
      <rect x="2" y="114" width="32" height="16" fill="#D1D6D6" stroke="black" stroke-width="1px"  />
      <text x="42" y="126" class="legend__entry legend__entry--datacommon">Unknown</text>
    </svg>
  </div>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions legend__entry legend__entry--datacommon">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>
<script src="{{'assets/javascripts/government-map.js' | absolute_url }}" type="module"></script>