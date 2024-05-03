(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([36.979940, -121.929430], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([36.979940, -121.929430]).addTo(map);

    var circle = L.circle([36.979940, -121.929430], {
        color: '#643b9f',
        fillColor: '#c8a4d4',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    var polygon = L.polygon([
        [37, -121.929430],
        [36.979931, -122],
        [36.979940, -121.929471]
    ]).addTo(map);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    circle.bindPopup("I am a circle.");

    polygon.bindPopup("I am a polygon.");

}());