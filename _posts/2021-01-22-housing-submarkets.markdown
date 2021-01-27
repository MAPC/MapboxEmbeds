---
layout: post
title:  "February 2021: Housing Submarkets"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper legend__wrapper--datacommon">
  <div class="legend" style="max-height:340px;">
    <span class="legend__title legend__title--datacommon" id="title">Median Home Value</span>
    <select id="type" name="type" class="legend__select">
      <option value="medhv" checked>Median home value</option>
      <option value="ch_medhv_p">% change in median home value</option>
      <option value="rhu_p">% renter households</option>
      <option value="yrblt59_p">% built prior to 1960</option>
      <option value="cash17_p">% cash sales</option>
    </select>
    <svg height="160" width="168" id="legend__medhv">
      <rect x="2" y="2" width="16" height="16" fill="#F2F0F7" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">≤ $250,000</text>
      <rect x="2" y="30" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">$250,001 – $500,000</text>
      <rect x="2" y="58" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">$500,001 – $750,000</text>
      <rect x="2" y="86" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">$750,001 – $1,000,000</text>
      <rect x="2" y="114" width="16" height="16" fill="#2F0D56" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">$1,000,001+</text>
      <rect x="2" y="142" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
    <svg height="160" width="168" id="legend__rhu_p" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#F2F0F7" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">0% – 20%</text>
      <rect x="2" y="30" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">20% – 40%</text>
      <rect x="2" y="58" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">40% – 60%</text>
      <rect x="2" y="86" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">60% – 80%</text>
      <rect x="2" y="114" width="16" height="16" fill="#2F0D56" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">80% – 100%</text>
      <rect x="2" y="142" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
    <svg height="160" width="168" id="legend__yrblt59_p" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#F2F0F7" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">0% – 20%</text>
      <rect x="2" y="30" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">20% – 40%</text>
      <rect x="2" y="58" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">40% – 60%</text>
      <rect x="2" y="86" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">60% – 80%</text>
      <rect x="2" y="114" width="16" height="16" fill="#2F0D56" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">80% – 100%</text>
      <rect x="2" y="142" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
    <svg height="160" width="168" id="legend__cash17_p" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#F2F0F7" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">0% – 10%</text>
      <rect x="2" y="30" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">10% – 20%</text>
      <rect x="2" y="58" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">20% – 30%</text>
      <rect x="2" y="86" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">30% – 40%</text>
      <rect x="2" y="114" width="16" height="16" fill="#2F0D56" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">40%+</text>
      <rect x="2" y="142" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
    <svg height="160" width="168" id="legend__ch_medhv_p" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#F2F0F7" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">-50% – 0%</text>
      <rect x="2" y="30" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">0% – 25%</text>
      <rect x="2" y="58" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">25% – 50%</text>
      <rect x="2" y="86" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">50% – 75%</text>
      <rect x="2" y="114" width="16" height="16" fill="#2F0D56" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">75%+</text>
      <rect x="2" y="142" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
  </div>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions legend__entry legend__entry--datacommon">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>

<script src="{{'assets/javascripts/housing-submarkets.js' | absolute_url }}" type="module"></script>