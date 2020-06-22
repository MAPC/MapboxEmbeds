# Mapbox Embeds
A collection of maps created with Mapbox GL JS for easy embedding into other websites.

Currently, the media queries are set for maps with a max width of 700px and a static height of 500px. For proper embedding, add the following code snippet on the page:
```
<div style="width: 100%; overflow:hidden; position:relative; height:500px;">
  <iframe src="[MAP URL HERE]" style="border:none; border:0; height:100%; left:0; position:absolute; top:0; width:100%; max-width:700px;"></iframe>
</div>
```