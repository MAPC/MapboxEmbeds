---
layout: post
title:  "February 2021: Housing Submarkets"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper legend__wrapper--datacommon">
  <div class="legend" style="max-height:330px;">
    <select id="type" name="type" class="legend__select">
      <option value="medhv" checked>Median home value</option>
      <option value="rhu_p">Percent renter households</option>
      <option value="yrblt59_p">Percent year build prior to 1960</option>
      <option value="cash17_p">Percent cash sales</option>
      <option value="ch_medhv_p">Percent change in median home value</option>
    </select>
    <svg height="216" width="168" id="legend__medhv">
      <rect x="2" y="2" width="16" height="16" fill="#F2F0F7" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">$147,000 – $300,000</text>
      <rect x="2" y="30" width="16" height="16" fill="#DADAEB" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">$300,001 – $450,000</text>
      <rect x="2" y="58" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">$450,001 – $600,000</text>
      <rect x="2" y="86" width="16" height="16" fill="#9E9AC8" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">$600,001 – $750,000</text>
      <rect x="2" y="114" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">$750,001 – $900,000</text>
      <rect x="2" y="142" width="16" height="16" fill="#6A51A3" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">$900,001 – $1,050,000</text>
      <rect x="2" y="170" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="182" class="legend__entry legend__entry--datacommon" fill="#231F20">$1,050,001+</text>
      <rect x="2" y="198" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="210" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
    <svg height="160" width="168" id="legend__rhu_p" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">0% – 20%</text>
      <rect x="2" y="30" width="16" height="16" fill="#9E9AC8" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">20% – 40%</text>
      <rect x="2" y="58" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">40% – 60%</text>
      <rect x="2" y="86" width="16" height="16" fill="#6A51A3" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">60% – 80%</text>
      <rect x="2" y="114" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">80% – 100%</text>
      <rect x="2" y="142" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
    <svg height="160" width="168" id="legend__yrblt59_p" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">0% – 20%</text>
      <rect x="2" y="30" width="16" height="16" fill="#9E9AC8" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">20% – 40%</text>
      <rect x="2" y="58" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">40% – 60%</text>
      <rect x="2" y="86" width="16" height="16" fill="#6A51A3" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">60% – 80%</text>
      <rect x="2" y="114" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">80% – 100%</text>
      <rect x="2" y="142" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
    <svg height="190" width="168" id="legend__cash17_p" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#DADAEB" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">0% – 15%</text>
      <rect x="2" y="30" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">15% – 30%</text>
      <rect x="2" y="58" width="16" height="16" fill="#9E9AC8" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">30% – 45%</text>
      <rect x="2" y="86" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">$45% – 60%</text>
      <rect x="2" y="114" width="16" height="16" fill="#6A51A3" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">60% – 75%</text>
      <rect x="2" y="142" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">75% – 90%</text>
      <rect x="2" y="170" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="182" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
    <svg height="216" width="168" id="legend__ch_medhv_p" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#F2F0F7" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">-50% – 0%</text>
      <rect x="2" y="30" width="16" height="16" fill="#DADAEB" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">0% – 20%</text>
      <rect x="2" y="58" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">20% – 40%</text>
      <rect x="2" y="86" width="16" height="16" fill="#9E9AC8" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">40% – 60%</text>
      <rect x="2" y="114" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">60% – 80%</text>
      <rect x="2" y="142" width="16" height="16" fill="#6A51A3" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">80% – 100%</text>
      <rect x="2" y="170" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="182" class="legend__entry legend__entry--datacommon" fill="#231F20">100%+</text>
      <rect x="2" y="198" width="16" height="16" fill="#B6B6B6" stroke="#231F20"/>
      <text x="28" y="210" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
  </div>
  <button type="button" class="button__collapsible button__collapsible--minus">-</button>
  <div>
    <label for="button__collapsible--plus" class="maximize-instructions legend__entry legend__entry--datacommon">Expand legend</label>
    <button type="button" class="button__collapsible button__collapsible--plus">+</button>
  </div>
</aside>

<script src="{{'assets/javascripts/housing-submarkets.js' | absolute_url }}" type="module"></script>