'use strict';
// our Map should be a global object
var elMapa;
// Creating the map and placing markers on it is initiated by a callback passed
// to the google maps api, which is done in its own html script tag in index.html
function googMap() {
  // Now that google exists (thanks to its api response) we can create a new map
  elMapa = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.04, lng: -77.51},
    zoom: 9
  });
  // Cycle through the points in our model and add a map marker for each
  viewModel.points().forEach(function(point) {
    setTimeout(function() {
      point.pin = new pin(point.name, point.lat, point.long, point.snippet);
    }, 200*viewModel.points.indexOf(point));
  });
}
// Handle errors from the google map
function googOops() {
  $(".map").text("Google Maps Unresponsive");
}
