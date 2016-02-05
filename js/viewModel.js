'use strict';

// viewModel variable handles data for the app and bindings
var viewModel = {
  // points will hold the list of points of interest
  points: ko.observableArray(),
  // invisibles will hold the list of items which are excluded by the active filter
  invisibles: ko.observableArray(),
  // filter is the filter input term provided by the user
  filter: ko.observable(),

  links: ko.observableArray(),
  // results handles the actual filtering process
  results: function() {
    // If no filter has yet been entered...
    if (!this.filter()) {
      // Make sure every invisible point becomes visible, by putting it back on our
      // regular "points" array
      this.invisibles().forEach(function(point) {
        viewModel.points.push(point);
        point.pin.marker.setMap(elMapa);
        point.pin.infoWindow.close();
      })
      // Keep the list sorted for a sense of continuity between view changes
      this.points.sort(function(prev,next) {
        return prev.name.toLowerCase() == next.name.toLowerCase() ? 0 : (prev.name.toLowerCase() < next.name.toLowerCase() ? -1 : 1);
      });
      // Since there's no filter, no point should be invisible
      this.invisibles([]);
    }
    // A filter has been provided
    else {
      // Look at invisible points to see if any match our filter term
      this.invisibles().forEach(function(point) {
        if (point.name.toLowerCase().indexOf(viewModel.filter().toLowerCase())>-1) {
          viewModel.points.push(point);
          point.pin.marker.setMap(elMapa);
        }
      });
      // Remove any visible points which don't match our filter term
      this.points().forEach(function(point) {
        viewModel.invisibles.push(point);
        point.pin.marker.setMap(null);
        if (point.name.toLowerCase().indexOf(viewModel.filter().toLowerCase())>-1) {
          viewModel.invisibles.remove(point);
          point.pin.marker.setMap(elMapa);
        }
      });
      // Keep it sorted for a sense of user continuity
      this.points.sort(function(prev,next) {
          return prev.name.toLowerCase() == next.name.toLowerCase() ? 0 : (prev.name.toLowerCase() < next.name.toLowerCase() ? -1 : 1);
      });
      // If anything's left in the invisible list, it shouldn't be in our list of
      // visible points aka "points"
      this.invisibles().forEach(function(point) {
        viewModel.points.remove(point);

      });
    }
    // Make sure we always have our wikipedia links after changing the view

  },
  // toggle will get togPin bouncing
  toggle: function(togPin) {
    if (togPin.marker !== undefined) {
      togPin.Bounce();
    }
  },
  // kill will make sure togPin isn't bouncing
  kill: function(togPin) {
    if (togPin.marker !== undefined) {
      togPin.noBounce();
    }
  },
  // info will open any infowindow associated with togPin
  info: function(togPin) {
    if (togPin.marker !== undefined) {
      togPin.openInfo();
    }
  },
  // getLinks will call wikipedia's api and upon success append an article
  // snippet and url to its corresponding item in points. This doesn't
  // handle changing the view, that's for...
  getLinks: function() {
    var msg = "No Relevant Wikipedia Article Found";
    this.points().forEach(function(point) {
      var search = point.name.replace(/ /g,"_");
      var wikiurl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + search + '&format=json';
      var wikiTimeout = setTimeout(function() {
        point.wikiURL = "Failed to Communicate with Wikipedia";
      }, 8000);
      $.ajax({
        url: wikiurl,
        dataType: "jsonp",
        success: function( response ) {
          var snippetList = response[2];
          var linkList = response[3];
          point.wikiURL(linkList[0]);
          point.snippet = snippetList[0];
          if (point.pin !== undefined) {
            point.pin.infoWindow.content = point.snippet;
          }
          if (point.wikiURL === 0) {
            point.wikiURL = msg;
          }
          if (point.snippet === 0) {
            point.snippet = msg;
          }
          clearTimeout(wikiTimeout);

        },
      });
    });
  },
};
// Apply the bindings specified within the viewModel
$(function() {
  ko.applyBindings(viewModel);
});
// Instantiate some obersvables with model data.
viewModel.points(focusPoints);
viewModel.invisibles([]);
viewModel.points.sort(function(prev,next) {
  return prev.name.toLowerCase() == next.name.toLowerCase() ? 0 : (prev.name.toLowerCase() < next.name.toLowerCase() ? -1 : 1);
});
viewModel.links();
viewModel.getLinks();
// viewModel.addLinks.extend({notify: 'always'});
