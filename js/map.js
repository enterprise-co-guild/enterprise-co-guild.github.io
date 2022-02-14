// Initialise what needs to be initialised
var polylines = [];
var lat, lng;
var mapURL =
  "https://cdn.discordapp.com/attachments/904873254219558912/939490646652252160/unknown.png";
var mapPins = {
  Stormwind: {
    name: "Stormwind",
    latlong: [434.6238811992566, 277.5822604205592],
    links: { "Borean Tundra": 3 },
  },
  Boralus: {
    name: "Boralus",
    latlong: [446.1250061136653, 265.2059992526412],
    links: { Stormwind: 1.5, "Borean Tundra": 3 },
  },
  "Jade Forest": {
    name: "Jade Forest",
    latlong: [416.8721449183214, 242.5786934809933],
    links: { Stormwind: 1.5, "Borean Tundra": 3 },
  },
  Gadgetzan: {
    name: "Gadgetzan",
    latlong: [427.1231475594248, 203.44970615212148],
    links: { Stormwind: 1.5, "Borean Tundra": 3 },
  },
  "Borean Tundra": {
    name: "Borean Tundra",
    latlong: [471.50248826176266, 227.07711383632844],
    links: { Stormwind: 1.5, "Borean Tundra": 3 },
  },
  "Howling Fjord": {
    name: "Howling Fjord",
    latlong: [469.00224371515213, 247.57920304378843],
    links: { Stormwind: 1.5, "Borean Tundra": 3 },
  },
};

// Init map
var map = L.map("map", {
  maxZoom: 3,
  minZoom: 3,
  zoomControl: false,
  crs: L.CRS.Simple,
}).setView([457, 237], 1);

map.setMaxBounds([
  [486, 294.5],
  [406.125, 179.5],
]);
L.imageOverlay(mapURL, [
  [486, 294.5],
  [406.125, 179.5],
]).addTo(map);

// For adding new points
map.addEventListener("click", function (ev) {
  lat = ev.latlng.lat;
  lng = ev.latlng.lng;
  console.log([lat, lng]);
});

var shipIcon = new L.Icon({
  iconUrl: "/images/boat.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [50, 50],
  iconAnchor: [25, 40],
  popupAnchor: [1, -34],
  shadowSize: [60, 41],
});

for (markers in mapPins) {
  let markerName = mapPins[markers].name;
  var marker = L.marker(mapPins[markers].latlong, {
    icon: shipIcon,
    title: markerName,
  })
    .addTo(map)
    .on("mouseover", drawLines)
    .on("click", drawLines)
    .on("mouseout", breakLines);
}
function drawLines(e) {
  breakLines();
  for (links in mapPins[e.target.options.title]["links"]) {
    var linkLatlong = mapPins[links]["latlong"];
    var thisLatLong = [e.latlng.lat, e.latlng.lng];
    var polyline = L.polyline([linkLatlong, thisLatLong], {
      color: "white",
    });
    polyline.bindTooltip(
      mapPins[e.target.options.title]["links"][links] + "G",
      {
        permanently: true,
        direction: "center",
        className: "tooltip-labels",
        offset: [5, 25],
      }
    );
    polyline.addTo(map);
    polyline.openTooltip();
    polylines.push(polyline);
  }
}
function breakLines() {
  polylines.forEach(function (item) {
    map.removeLayer(item);
  });
}
