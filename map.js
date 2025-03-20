
// Initialize the map and set its view
var map = L.map('map').setView([39.678121, -104.961753], 15);

// Add the OpenStreetMap tile layer (required for rendering the map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a marker at the specified coordinates
L.marker([39.678121, -104.961753]).addTo(map)
    .bindPopup('Marker at 39.678121, -104.961753')
    .openPopup();

