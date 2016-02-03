'use strict';
// Constructor for the pin attached to each point
var pin = function (name, lat, long, wikiContent) {
  // Call google maps to create the map marker for this spot
  this.marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: laMapa,
    title: name,
    animation: google.maps.Animation.DROP
    });
  // Add a listener to toggle the marker's bounce animation
  this.marker.addListener('click', this.toggleBounce);
  // Call google maps to create a new Infowindow for this spot
  this.infoWindow = new google.maps.InfoWindow({
    content: wikiContent
  });
  var win = this.infoWindow;
  this.marker.addListener('click', function() {
    win.open(laMapa, this);
  });
}
// Toggle the bouncing animation for the marker
pin.prototype.toggleBounce = function() {
  if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}
// Set the marker's animation to bounce
pin.prototype.Bounce = function() {
    this.marker.setAnimation(google.maps.Animation.BOUNCE);
}
// Stop the marker from bouncing
pin.prototype.noBounce = function() {
  this.marker.setAnimation(null);
}
// Set which map the marker is on to the one passed in
pin.prototype.setMap = function(map) {
  this.marker.map = map;
}
// Open the marker's infowindow
pin.prototype.openInfo = function() {
  this.infoWindow.open(laMapa, this.marker);
}
// Create an array to hold points of interest
var focusPoints = [
    {name: "Colvin Run Mill",
    lat: 38.968,
    long: -77.293,
    wikiURL: ""},
    {name: "Wolf Trap National Park for the Performing Arts",
    lat: 38.932,
    long: -77.265,
    wikiURL: ""},
    {name: "Shenandoah National Park",
    lat: 38.53333,
    long: -78.35,
    wikiURL: ""},
    {name: "Great Falls Park",
    lat: 38.994239,
    long: -77.252426,
    wikiURL: ""},
    {name: "Harpers Ferry National Historical Park",
    lat: 39.322778,
    long: -77.729722,
    wikiURL: ""}
  ];
