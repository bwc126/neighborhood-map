"use strict";

// viewModel variable handles data for the app and bindings
var viewModel = {
  // list filtering, visibility, icon alt text, icon img
  points: ko.observableArray(),
  invisibles: ko.observableArray(),
  // remove points
  filter: ko.observable(),
  // center to point
  results: function() {
    if (!this.filter()) {
      this.invisibles().forEach(function(point) {
        viewModel.points.push(point);
        point.pin.marker.setMap(laMapa);
        point.pin.infoWindow.close();
      })
      this.points.sort(function(prev,next) {
        return prev.name.toLowerCase() == next.name.toLowerCase() ? 0 : (prev.name.toLowerCase() < next.name.toLowerCase() ? -1 : 1);
      });
      this.invisibles([]);
    }
    else {
      this.invisibles().forEach(function(point) {
        if (point.name.toLowerCase().indexOf(viewModel.filter().toLowerCase())>-1) {
          viewModel.points.push(point);
          point.pin.marker.setMap(laMapa);
        }
      });
      this.points().forEach(function(point) {
        viewModel.invisibles.push(point);
        point.pin.marker.setMap(null);
        if (point.name.toLowerCase().indexOf(viewModel.filter().toLowerCase())>-1) {
          viewModel.invisibles.remove(point);
          point.pin.marker.setMap(laMapa);
        }
      });
      this.points.sort(function(prev,next) {
          return prev.name.toLowerCase() == next.name.toLowerCase() ? 0 : (prev.name.toLowerCase() < next.name.toLowerCase() ? -1 : 1);
      });
      this.invisibles().forEach(function(point) {
        viewModel.points.remove(point);

      });
    }
    this.addLinks();
  },
  toggle: function(togPin) {
    if (togPin.marker !== undefined) {
      togPin.Bounce();
    }
  },
  kill: function(togPin) {
    if (togPin.marker !== undefined) {
      togPin.noBounce();
    }
  },
  info: function(togPin) {
    if (togPin.marker !== undefined) {
      togPin.openInfo();
    }
  },
  getLinks: function() {
    var msg = "No Relevant Wikipedia Article Found";
    this.points().forEach(function(point) {
      var search = point.name.replace(/ /g,"_");
      var wikiurl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + search + '&format=json';
      $.ajax({
        url: wikiurl,
        dataType: "jsonp",
        success: function( response ) {
          console.log(response);
          var snippetList = response[2];
          var linkList = response[3];
          point.wikiURL = linkList[0];
          point.snippet = snippetList[0];
          viewModel.addLinks(point);
          if (point.pin !== undefined) {
            point.pin.infoWindow.content = point.snippet;
          };
          if (point.wikiURL == "") {
            point.wikiURL = msg;
          };
          if (point.snippet == "") {
            point.snippet = msg;
          };
        },
        fail: function() {
          point.wikiURL = msg;
          point.snippet = msg;
        }
      });
    })
  },
  addLinks: function(optPoint) {
    if (optPoint === undefined) {
      this.points().forEach(function(point) {
        $("#wiki-url-"+point.name.replace(/ /g,'_')).attr("href", point.wikiURL);
        $("#wiki-url-"+point.name.replace(/ /g,'_')).text(point.wikiURL);
      });
    }
    else {
      console.log("attempting to add link and snippet for " + optPoint.name.replace(/ /g,'_'));
      $("#wiki-url-"+optPoint.name.replace(/ /g,'_')).attr("href", optPoint.wikiURL);
      $("#wiki-url-"+optPoint.name.replace(/ /g,'_')).text(optPoint.wikiURL);
    }
  }
};

$(function(){
  ko.applyBindings(viewModel);
});
viewModel.points(focusPoints);
viewModel.invisibles([]);
viewModel.points.sort(function(prev,next) {
  return prev.name.toLowerCase() == next.name.toLowerCase() ? 0 : (prev.name.toLowerCase() < next.name.toLowerCase() ? -1 : 1)
});
viewModel.getLinks();
