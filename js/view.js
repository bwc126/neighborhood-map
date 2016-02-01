"use strict";
// Map class
var laMapa;
function googMap() {
  //call google maps and create a map here
  laMapa = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.04, lng: -77.51},
    zoom: 9
  });
  // Cycle through the points in our model and add a map marker for each
  viewModel.points().forEach(function(point){
    setTimeout(function() {
      point.pin = new pin(point.name, point.lat, point.long, point.snippet);
    }, 200*viewModel.points.indexOf(point));
  });

};
