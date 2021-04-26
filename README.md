# Mapbox Embeds
A collection of maps created with Mapbox GL JS for easy embedding into other websites.

*Note: this Jekyll site automatically deploys to GitHub Pages when code is pushed to the `main` branch. If edited maps are embedded into other sites, they will automatically update there.*

## Creating a map (for DataCommon)
1. Create a new markdown file in `_posts`
2. Copy starter template from `2021-04-14-template.markdown`
3. Create a Javascript file in `assets/javascripts`. Update the reference in your new markdown file to point to this script *(Otional: use `template-map.js` as a starter for your map)*

## Embedding a map

Currently, the media queries are set for maps with a max width of 700px and a static height of 500px. For proper embedding, add the following code snippet on the page:
```
<div style="width: 100%; overflow:hidden; position:relative; height:500px;">
  <iframe src="[MAP URL HERE]" style="border:none; border:0; height:100%; left:0; position:absolute; top:0; width:100%; max-width:700px;"></iframe>
</div>
```