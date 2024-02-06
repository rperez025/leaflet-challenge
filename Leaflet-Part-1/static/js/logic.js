// Create the tile layers for the backgrounds of the map 
// (obtain from: https://leaflet-extras.github.io/leaflet-providers/preview/)
var defaultMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Grayscale layer
var grayscale = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

// Water color layer
var waterColor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
	minZoom: 1,
	maxZoom: 16,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

// Topography Map
let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Make a basemaps object
let basemaps = {
    Grayscale: grayscale,
    'Water Color': waterColor,
    'Topography': topoMap,
    Default: defaultMap
};

// Make a map object
var myMap = L.map('map', {
    center: [36.7783, -119.4179],
    zoom: 5,
    layers: [grayscale, waterColor, topoMap, defaultMap]
});

// Add the default map to the map
defaultMap.addTo(myMap);

// Get the data for the tectonic plates and then draw on the map
// variable to hold the tectonic plates layer
let tectonicplates = new L.layerGroup();

// Call the api to get the info for the tectonic plates
d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json')
.then(function(plateData){
    // console log to make sure the data loads
    //console.log(plateData);

    // load the data using geoJSON and add to the tectonic plates layer
    L.geoJson(plateData,{
        // add styling to make the lines visible
        color: 'yellow',
        weight: 1
    }).addTo(tectonicplates);
})

// Add the tectonic plates to the map
tectonicplates.addTo(myMap);

// Create a variable to hold the earthquake data layer
let earthquakes = new L.layerGroup();

// Now get the data for the earthquakes and populate the layer group
// Make a call to the api to get the geoJSON data 
// (URL: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to figure out which
// geoJSON we are going to use based on the assignment (the past 7 days, All Earthquakes)
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
.then(
    function(earthquakeData){
        // console log to make sure the data loads
        console.log(earthquakeData);
        // Need to plot circles where the radius is dependent on the magnitude
        // and the color is dependent on the depth

        //make a function that chooses the color of the data point
        function dataColor(depth){
            if (depth > 90)
                return 'red';
            else if (depth > 70)
                return '#fc4903'; // Google 'rgb color picker' to find the right orange
            else if (depth > 50)
                return '#fc8403'; // Google 'rgb color picker' to find the right orange
            else if (depth > 30)
                return '#fcad03'; // Google 'rgb color picker' to find the right yellow
            else if (depth > 10)
                return '#cafc03'; // Google 'rgb color picker' to find the right green
            else 
                return 'green';
        }

        // Make a funtion that will determine the size of the radius
        function radiusSize(mag){
            if (mag == 0)
                return 1; // ensures that a zero magnitude earthquake shows up (is visible)
            else
                return mag * 5; // ensures that the circe is pronounced in the map
        }

        // add on to the style for each data point
        function dataStyle(feature)
        {
            return {
                opacity: 5,
                fillOpacity: 0.5,
                fillColor: dataColor(feature.geometry.coordinates[2]), // use index 2 for depth
                color: '000000', // black outline
                radius: radiusSize(feature.properties.mag), // obtains the magnitude
                weight: 0.5,
                stroke: true
            }
        }

        // add the geoJSON data to the earthquake layer group
        L.geoJSON(earthquakeData, {
            // make each feature a marker that is on the map; remember - each marker is going to 
            // be a circle
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            // set the style for each marker
            style: dataStyle, // calls the data style function and passes in the earthquake data
            // then you can add popups
            onEachFeature: function(feature, layer){
                layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                                Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                                Location: <b>${feature.properties.place}</b>`);
            }
        }).addTo(earthquakes)
    }
);

// add the earthquake layer to the map
earthquakes.addTo(myMap);

// Add the overlay for the tectonic plates and for the earthquakes
let overlays = {
    'Tectonic Plates': tectonicplates,
    'Earthquake Data': earthquakes
};

// Add the Layer control
L.control.layers(basemaps, overlays).addTo(myMap);

// Add the legend to the map
let legend = L.control({
    position: 'bottomright'
});

// Add the properties for the legend
legend.onAdd = function() {
    // Create a div for the legend to appear in the web page
    let div = L.DomUtil.create('div', 'info legend');

    // Set up the intervals
    let intervals = [-10, 10, 30, 50, 70, 90];
    // set the colors for the intervals
    let colors = [
        'green',
        '#cafc03',
        '#fcad03',
        '#fc8403',
        '#fc4903',
        'red'
    ];

    // loop through the intervals and the colors and generate a label
    // with a colored square for each interval
    for (var i = 0; i < intervals.length; i++) {
        // inner html that sets the square for each interval and label
        div.innerHTML += '<i style="background: '
            + colors[i]
            + '; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;"></i>'
            + intervals[i] 
            + (intervals[i + 1] ? '&ndash;' + intervals[i + 1] + 'km' : '+km') + '<br>';
    }

    return div;
};

// Add the legend to the map
legend.addTo(myMap); 