## Udacity Nanodegree Project 5-1: Neighborhood Map
  A simple one-page application that includes a google map with markers for points of interest. A filter button allows the user to enter a term that filters which markers are visible. Mousing over the list of points of interest causes the corresponding map marker to animate (bounce). Clicking on a marker also causes it to bounce. Clicking on either a list item or its corresponding map marker opens an info window within the map with information from its wikipedia article. Each list item also has a url to its wikipedia article.

### The Map View
  A call to the google maps API is used to load a standard google streetview map and add markers corresponding to points of interest in the region. These markers are built with or are modified to include an info window with information from an ajax request to wikipedia, in the form of a short snippet from its article. Clicking on the markers or their corresponding list item opens this info window. Mousing over the list item causes the marker to animate, as does clicking on the marker itself. Moving the mouse away from the list item or clicking the marker again stops the animation.

### The List View
  Using knockout, each point has its name and an A-tag for its wikipedia url appended to the page, along with event trackers for mousing over or away, or clicking on the name. Each of these actions calls a function commensurate with carrying out the functionality described previously.

  The list view can also be filtered by entering text in the input field and pressing enter or clicking "filter points". Only markers which contain the text entered will be shown on both the list view and map view. 
