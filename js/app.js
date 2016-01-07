"use strict";

// Map class
var laMapa;
function googMap() {
  //call google maps and create a map here
  laMapa = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
};

// viewModel variable handles data for the app and bindings
var viewModel = function(){
// clear session storage
  // hold the map instance

  // window.map = this.map.map;
  // console.log(this, "herpderp");
  // create marker index
  this.personName = 'somebod';
  // list filtering, visibility, icon alt text, icon img

  // remove points

  // center to point

  // select point
    // take in note data into sessionStorage
  //

  // get styling info about the current point

  // handle mousing over the point's marker or list item

  // handle the mouse leaving a marker or list item

  // handle point creation

  // list of points

  // handle current points, point filer, shown points

  // do other API stuff like foursquare

};

$(function(){
  ko.applyBindings(new viewModel());
});
