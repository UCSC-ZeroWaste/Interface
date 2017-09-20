


export const AUTOPLAY = {
  restartInterval: 500 * 1000, //time interval for autoplay to restart after touch
  nextSlideInterval: 5 * 1000, //time until slider moves to the next slide
  slideSpeed: 1 * 1000 //time it takes to move from one slide to the next
};

export const CHART = {
  // xAxisLabelOffset: 40,
  // yAxisLabelOffset: 40,

  settings: {
    legend: false,
    gridHorizontal: false,
    gridVertical: false,
    hoverAnimation: false,
  },

  axes: {
    // xAxisLabelStrokeWidth: 0.01,
    // yAxisLabelStrokeWidth: 0.01,
    axesColor: 'white',
    xAxisLabelColor: 'white',
    yAxisLabelColor: 'white',

    xAxisStrokeWidth: '3',
    yAxisStrokeWidth: '3',
    xAxisTickStroke: 'white',
    yAxisTickStroke: 'white',

    xAxisTickTextStroke: 'white',
    yAxisTickTextStroke: 'white',
  }
};

const mapColor = {
  tan: '#dfd2ae',
  black: '#000000',
  white: '#ffffff',
  blue: '#363696'
};

export const MAP_STYLE = [
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  // {
  //   "featureType": "road",
  //   "stylers": [
  //     {
  //       "color": mapColor.white
  //     }
  //   ]
  // },
  // {
  //   "featureType": "road.local",
  //   "elementType": "geometry",
  //   "stylers": [
  //     {
  //       "color": mapColor.white
  //     }
  //   ]
  // },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": mapColor.tan
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": mapColor.tan
        // "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": mapColor.black
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": mapColor.blue
        // "visibility": "off"
      }
    ]
  },
];
