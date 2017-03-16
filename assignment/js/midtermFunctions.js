/* ================================
Week 6 Assignment: Midterm Functions + Signatures

================================ */
/* =====================
Leaflet Configuration
===================== */

//Questions:
//How to attach the slide functions into the slide numbers?
//I have a function(slideView) which says when each slide number appears, call a specific function - but the function doesn't run on it's own
//I need the function to reference the parsed data - I can put in the ajax call, but then the layers overlap
//Should I add layers and then remove them? Is there a cleaner way to do it?
//Can I call the functions in a way that "resets" the map each time?


L.mapbox.accessToken = 'pk.eyJ1IjoiY2xhaXJlZG91Z2xhc3MiLCJhIjoiY2owYmIxaXlkMDM0ODMzbjMwZ3MwaDBjMSJ9.PrFPpLsNtOa3vWtHzw4Gjg';
var map = L.mapbox.map('map')
.setView([40.733110, -73.980036], 11);
// Use styleLayer to add a Mapbox style created in Mapbox Studio
L.mapbox.styleLayer('mapbox://styles/mapbox/emerald-v8').addTo(map);

/* =====================
var map = L.mapbox.map('map', {
  center: [40.733110, -73.980036],
  zoom: 11
});
var Stamen_TonerLite = L.mapbox.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
===================== */

// AJAX Call to fetch data
var dataset = "https://raw.githubusercontent.com/clairedouglass/midterm/master/Subway%20Lines.geojson";
var featureGroup;
var parsedData;

// Parse GeoJSON file and add lines to map with styling
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    parsedData = JSON.parse(data);
    console.log(parsedData);
    featureGroup = L.geoJson(parsedData, {style: myStyle1}).addTo(map);
  });
  $('#prevButton').hide();
});


//define the state
var state = {
  "slideNumber": 1,
  "slideData": [
    {
    "name": "Slide1",
    "title": "New York City Subway Lines"
    },
    {
    "name": "Slide2",
    "title": "Subway History"
    },
    {
    "name": "Slide3",
    "title": "Ongoing Superstorm Sandy Recovery Work"
    },
    {
    "name": "Slide4",
    "title": "New Hudson Yards Line"
    },
    {
    "name": "Slide5",
    "title": "Three New Second Avenue Subway Stops"
    },
    {
    "name": "Slide5",
    "title": "Three New Second Avenue Subway Stops"
    },
  ]
};

//adds functions to slides
var slideView = function(state) {
  if (state.slideNumber === 1) {
    featureGroup.setStyle(myStyle1);
  }
  else if (state.slideNumber === 2) {
    featureGroup.setStyle(myStyle2);
  }
  else if (state.slideNumber === 3) {
    featureGroup.setStyle(myStyle3);
  }
  else if (state.slideNumber === 4) {
    featureGroup.setStyle(myStyle4);
  }
  else if (state.slideNumber === 5) {
    featureGroup.setStyle(myStyle5);
  }
};


//click next button function
var forward = function(event) {
  var limit = state.slideData.length - 1;
  if (state.slideNumber + 1 > limit) {
    state.slideNumber = 0;
  } else {
    state.slideNumber = state.slideNumber + 1;
  }
  return state.slideNumber;
};

//pass function into button upon click
$("#nextButton").click(function(event) {
  forward();
  slideView(state);
});

//click previous button
var backward = function(event) {
  if (state.slideNumber - 1 < 0) {
    state.slideNumber = state.slideNumber.length - 1;
  } else {
    state.slideNumber = state.slideNumber - 1;
  }
  return state.slideNumber;
};

//pass function into button upon click
$("#prevButton").click(function(event){
  backward();
  slideView(state);
});


/* ================================

================================ */

// Function that color the lines for slide 1
//Logic: add colors by examining the "rt_symbol" field

var myStyle1 = function(feature) {
    $('#prevButton').hide();
    $(".main").empty().append("<h3>New York City Subway Lines</h3>");
    $('#content').empty()
      .append("<p>Displayed are New York City subway lines respresnted by their associated MTA colors. There are a total of 24 different subway lines servicing 4 boroughs.</p2>");
    //$(".main").replaceWith("<h2>New York City Subway Lines</h2>");
    //$('#content').replaceWith("<p>Subway lines are represented by their MTA colors</p>");
    var mainColor = feature.properties.rt_symbol;
    switch(mainColor) {
      case "1":
        return {color: 'red'};
      case "4":
        return {color: 'green'};
      case "7":
        return {color: 'purple'};
      case "A":
        return {color: 'blue'};
      case "B":
        return {color: 'orange'};
      case "G":
        return {color: '#76c988'};
      case "J":
        return {color: 'brown'};
      case "L":
        return {color: 'gray'};
      case "N":
        return {color: 'yellow'};
    }
};


// Function that colors the lines for slide 2
//Logic: categorize rt_symbol values into three groups

var myStyle2 = function(feature) {
  $('#prevButton').show();
  $(".main").empty().append("<h3>History: A Tale of Three Companies</h3>");
  $('#content').empty()
    .append("<p>Originally, the New York City subway system was comprised of 3 Companies, the BMT, IRT and IND. Each company operated separately and it wasn't until 1940 that the city bought and consolidated the private companies. In the map BMT is displayed in Yellow, the IRT is displayed in Red and the IND is displayed in Blue.</p>");
  var mainColor = feature.properties.rt_symbol;
  switch(mainColor) {
    case "1":
    case "4":
    case "7":
      return {color: 'red'};
    case "A":
    case "B":
    case "G":
      return {color: 'blue'};
    case "L":
    case "J":
    case "N":
      return {color: 'yellow'};
  }
//  setStyle()
};

//Define zoom for slide 3
var mainSlideCenter = [40.772850, -73.955793];
var mainZoom = function() {
  map.setView(mainSlideCenter, 11);
};

// Function that colors the lines for slide 3
//Logic: highlight routes using the "name" field
var myStyle3 = function(feature) {
  mainZoom();
  $(".main").empty().append("<h3>Ongoing Superstorm Sandy Recovery Efforts</h3>");
  $('#content').empty().append("<p>Lines highlighted in red are currently under construction due to Supestorm Sandy repair efforts. Many of the tunnels connecting Manhattan and Brooklyn suffered severe damage and will still require significant time to repair.</p>");
  var mainColor = feature.properties.rt_symbol;
  switch(mainColor) {
    case "L":
    case "A":
    case "C":
    case "E":
    case "M":
      return {color: 'red'};
    default:
      return {color: 'gray'};
  }
};

//define zoom for slide 4
var slide4Center = [40.756778, -73.994099];
var myStyle4Zoom = function() {
  map.setView(slide4Center, 15);
};

// Function that colors the lines for slide 4
var myStyle4 = function(feature) {
  myStyle4Zoom();
  $("#nextButton").show();
  $(".main").empty().append("<h3>New Infrastructure: Hudson Yards Subway Stop</h3>");
  $('#content').empty()
    .append("<p>The 7 Line opened a new Hudson Yards subway stop in September 2015. It was the first new subway station to open in 26 Years. It provides access to an area undergoing rapid change, with many new residential and commercial developments underway.</p>");
  var mainColor = feature.properties.rt_symbol;
  switch(mainColor) {
    case "7":
      return {color: 'green'};
    default:
      return {color: 'gray'};
    }
};

//Define zoom for slide 5
var slide5Center = [40.772850, -73.955793];
var myStyle5Zoom = function() {
  map.setView(slide5Center, 15);
};

// Function that colors the lines for slide 5
var myStyle5 = function(feature) {
  myStyle5Zoom();
  $('#nextButton').hide();
  $(".main").empty().append("<h3>New Subway Infrastructure: Second Avenue Subway</h3>");
  $('#content').empty()
    .append("<p>Three new stops opened as part of the 'Q' line on January 1, 2017. A proposed plan since 1919, this subway extension provides greater connectivity the Yorkville neighborhood and relieves congestion on the Lexington Avenue subway.</p>");
  var mainColor = feature.properties.name;
  switch(mainColor) {
    case "Q":
      return {color: 'green'};
    default:
      return {color: 'gray'};
    }
};

/* ================================

===================== */
