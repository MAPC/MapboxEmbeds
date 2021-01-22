---
layout: post
title:  "February 2021: Housing Submarkets"
description: "Click to view data visualization"
---
<main id="map" class="map"></main>
<aside class="legend__wrapper legend__wrapper--datacommon">
  <div class="legend" style="max-height:330px;">
    <select id="type" name="type" class="legend__select">
      <option value="mhi" checked>Median Household Income</option>
      <option value="ch_rhu_p">Change in % Rented Housing Units</option>
    </select>
    <svg height="216" width="168" id="legend__mhi">
      <rect x="2" y="2" width="16" height="16" fill="#F2F0F7" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">$16,000 – $35,000</text>
      <rect x="2" y="30" width="16" height="16" fill="#DADAEB" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">$35,001 – $50,000</text>
      <rect x="2" y="58" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">$50,001 – $75,000</text>
      <rect x="2" y="86" width="16" height="16" fill="#9E9AC8" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">$75,001 – $100,000</text>
      <rect x="2" y="114" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">$100,001 – $150,000</text>
      <rect x="2" y="142" width="16" height="16" fill="#6A51A3" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">$150,001 – $200,000</text>
      <rect x="2" y="170" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="182" class="legend__entry legend__entry--datacommon" fill="#231F20">$200,001+</text>
      <rect x="2" y="198" width="16" height="16" fill="#707070" stroke="#231F20"/>
      <text x="28" y="210" class="legend__entry legend__entry--datacommon" fill="#231F20">Data unavailable</text>
    </svg>
    <svg height="216" width="168" id="legend__ch_rhu_p" style="display: none;">
      <rect x="2" y="2" width="16" height="16" fill="#F2F0F7" stroke="#231F20"/>
      <text x="28" y="14" class="legend__entry legend__entry--datacommon" fill="#231F20">-100% – -25%</text>
      <rect x="2" y="30" width="16" height="16" fill="#DADAEB" stroke="#231F20"/>
      <text x="28" y="42" class="legend__entry legend__entry--datacommon" fill="#231F20">-25% – 25%</text>
      <rect x="2" y="58" width="16" height="16" fill="#BCBDDC" stroke="#231F20"/>
      <text x="28" y="70" class="legend__entry legend__entry--datacommon" fill="#231F20">25% – 50%</text>
      <rect x="2" y="86" width="16" height="16" fill="#9E9AC8" stroke="#231F20"/>
      <text x="28" y="98" class="legend__entry legend__entry--datacommon" fill="#231F20">51% – 100%</text>
      <rect x="2" y="114" width="16" height="16" fill="#807DBA" stroke="#231F20"/>
      <text x="28" y="126" class="legend__entry legend__entry--datacommon" fill="#231F20">101% – 200%</text>
      <rect x="2" y="142" width="16" height="16" fill="#6A51A3" stroke="#231F20"/>
      <text x="28" y="154" class="legend__entry legend__entry--datacommon" fill="#231F20">200% - </text>
      <rect x="2" y="170" width="16" height="16" fill="#4A1486" stroke="#231F20"/>
      <text x="28" y="182" class="legend__entry legend__entry--datacommon" fill="#231F20">200%</text>
      <rect x="2" y="198" width="16" height="16" fill="#707070" stroke="#231F20"/>
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