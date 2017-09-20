import React, {Component} from 'react';
import {mapsStaticKey, mapsJavascriptKey} from '../../../config.js';
import styles from '../../../App.css';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import {SLUG_PINS} from '../../constants/constants';
import {MAP_STYLE} from '../../constants/settings';
import {connect} from 'react-redux';
import ContainerDimensions from 'react-container-dimensions';

const Marker = ({site, rank, containerStyle, textStyle, markerStyle}) => {

  function getDegree(rank) {
    switch (rank) {
      case 1:
      return 'st';
      case 2:
      return 'nd';
      case 3:
      return 'rd';
      default:
      return 'th';
    }
  }

  return (
    <div style={containerStyle}>
      <div style={markerStyle}/>
      <div style={textStyle}>
        <div style={{marginRight: '.2em'}}>
          {rank}<sup>{getDegree(rank)}</sup>
        </div>
        <div>
           {site}
        </div>
      </div>
    </div>
  );
}

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.createMapOptions = this.createMapOptions.bind(this);
  }

  //TODO zoom of 16 appears to work on the touchscreen, need zoom of 15 for desktop
  // static defaultProps = {
  //   center: {lat: 36.995, lng: -122.060},
  //   zoom: 15,
  // };
  // bounds: { nw: {lat: 37.003549, lng: -122.073339},
  //           se: {lat: 36.987191, lng: -122.049263},
  //         }
  // ne: {lat: 37.003549, lng: -122.049263},
  // sw: {lat: 36.987191, lng: -122.073339},

  // getBounds() {
  //   const nw = {lat: 37.003549, long: -122.073339};
  //   const sw = {lat: 36.987191, long: -122.073339};
  //   const ne = {lat: 37.003549, long: -122.049263};
  //   const se = {lat: 36.987191, long: -122.049263};
  //   return {nw, se, sw, ne};
  // }



  renderMarkers() {
    const MARKERS = {
      'Kresge College': {lat: '36.9972381', long: '-122.0667945'},
      'Porter College': {lat: '36.9943943', long: '-122.0652214'},
      'Rachel Carson (Col. 8) College': {lat: '36.9911913', long: '-122.0647242'},
      'Oakes College': {lat: '36.9890294', long: '-122.0646362'},

      'College 9': {lat: '37.0015813', long: '-122.0572619'},
      'College 10': {lat: '37.00001', long: '-122.0583717'},
      'Crown/Merrill Apartments': {lat: '37.0019539', long: '-122.0539588'},
      'Crown College': {lat: '36.9992', long: '-122.0549798'},
      'Merrill College': {lat: '36.9997926', long: '-122.0525'},
      'Cowell College': {lat: '36.9971235', long: '-122.0542672'},
      'Stevenson College': {lat: '36.9965462', long: '-122.0520517'},
    };

    return this.props.leaders.map( (leader, index) => {
      let options = MARKERS[leader.site]
      let slugImage = SLUG_PINS[index];

      const MARKER_SIZE = '6.5em';
      const TEXT_WIDTH = '9em';
      const TEXT_HEIGHT = '2.5em';
      const MARGIN = '.5em';

      const containerStyle = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 'auto',
        height: MARKER_SIZE + TEXT_HEIGHT,
        left: -TEXT_WIDTH / 2,
        top: -MARKER_SIZE,
      }

      const textStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: TEXT_WIDTH,
        height: TEXT_HEIGHT,
        backgroundColor: 'white',
        border: '1px grey solid',
        borderRadius: '3px',
        boxSizing: 'border-box',
        fontSize: '1em'
      }

      const markerStyle = {
        width: MARKER_SIZE,
        height: MARKER_SIZE,
        marginBottom: MARGIN,
        backgroundImage: `url(${slugImage})`,
        backgroundSize: 'cover',
      }

      return (
        <Marker
          lat={options.lat}
          lng={options.long}
          key={index}
          markerStyle={markerStyle}
          textStyle={textStyle}
          containerStyle={containerStyle}
          site={leader.site}
          rank={index + 1}
        />
      )
    });
  }

  createMapOptions(maps) {


    return {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      draggable: false,
      styles: MAP_STYLE,
      backgroundColor: 'hsla(0, 0%, 0%, 0)',
    };
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  // return {
  //   zoomControlOptions: {
  //     position: maps.ControlPosition.RIGHT_CENTER,
  //     style: maps.ZoomControlStyle.SMALL
  //   },
  //   mapTypeControlOptions: {
  //     position: maps.ControlPosition.TOP_RIGHT
  //   },
  //   mapTypeControl: true
  // };
  }

  renderMap(width, height) {
    const bounds = {
              nw: {lat: 37.003549, lng: -122.073339},
              se: {lat: 36.987191, lng: -122.049263},
            };

    const size = {
      width, // Map width in pixels
      height // Map height in pixels
    };

    const {center, zoom} = fitBounds(bounds, size);

    return (
      <GoogleMapReact
        ref='map'
        defaultCenter={center}
        defaultZoom={zoom}
        options={this.createMapOptions}
        bootstrapURLKeys={{key: mapsJavascriptKey}}
        >
        {this.renderMarkers()}
      </GoogleMapReact>
    );
  }

  render() {
    return (
      <ContainerDimensions>
        { ({ height, width }) => this.renderMap(height, width) }
      </ContainerDimensions>

     );
  }
}

const mapStateToProps = (state) => ({
  leaders: state.records.leaders
});

export default connect(mapStateToProps)(HeatMap);
