'use strict';
// Constructor for the pin attached to each point
var currentlyOpen;
var bouncing;
var pin = function (name, lat, long, wikiContent) {
  // Call google maps to create the map marker for this spot
  this.marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: elMapa,
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
    if (currentlyOpen) {
      currentlyOpen.close();
    }
    win.open(elMapa, this);
    currentlyOpen = win;
  });
};
// Toggle the bouncing animation for the marker
pin.prototype.toggleBounce = function() {
  if (this.getAnimation() !== null) {
    this.setAnimation(null);
    bouncing = undefined;
  }
  else {
    if (bouncing) {
      bouncing.setAnimation(null);
    }
    this.setAnimation(google.maps.Animation.BOUNCE);
    bouncing = this;
  }
};
// Set the marker's animation to bounce
pin.prototype.Bounce = function() {
  if (bouncing) {
    bouncing.setAnimation(null);
  }
  this.marker.setAnimation(google.maps.Animation.BOUNCE);
  bouncing = this.marker;
};
// Stop the marker from bouncing
pin.prototype.noBounce = function() {
  this.marker.setAnimation(null);
  bouncing = undefined;
};
// Set which map the marker is on to the one passed in
pin.prototype.setMap = function(map) {
  this.marker.map = map;
};
// Open the marker's infowindow
pin.prototype.openInfo = function() {

  if (currentlyOpen) {

    currentlyOpen.close();
  }
  this.infoWindow.open(elMapa, this.marker);
  currentlyOpen = this.infoWindow;
};
// Create an array to hold points of interest
var focusPoints = [
    {name: "Colvin Run Mill",
    lat: 38.968,
    long: -77.293,
    wikiURL: ko.observable()},
    {name: "Wolf Trap National Park for the Performing Arts",
    lat: 38.932,
    long: -77.265,
    wikiURL: ko.observable()},
    {name: "Shenandoah National Park",
    lat: 38.53333,
    long: -78.35,
    wikiURL: ko.observable()},
    {name: "Great Falls Park",
    lat: 38.994239,
    long: -77.252426,
    wikiURL: ko.observable()},
    {name: "Harpers Ferry National Historical Park",
    lat: 39.322778,
    long: -77.729722,
    wikiURL: ko.observable()}
  ];
