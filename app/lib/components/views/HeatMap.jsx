import React, {Component} from 'react';
import {mapsStaticKey, mapsJavascriptKey} from '../../../config.js';
import styles from '../../../App.css';
import GoogleMapReact from 'google-map-react';
import {SLUG_PINS} from '../../constants/constants';
import {connect} from 'react-redux';

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
          {rank}<sup>{getDegree(rank)}</sup>&nbsp;Place
        </div>
        <div className={styles.marker_college_labels}>
           {site}
        </div>
      </div>
    </div>
  )
}

class HeatMap extends Component {
  constructor(props) {
    super(props);
  }

  //TODO zoom of 16 appears to work on the touchscreen, need zoom of 15 for desktop
  static defaultProps = {
    center: {lat: 36.995, lng: -122.060},
    zoom: 16
  };




  renderMarkers() {

    // const color = {tan: '0xdfd2ae', black: '0x000000', white: '0xffffff', blue: '0x363696'};
    // const features = [
    //   '&style=feature:landscape|element:geometry|color:' + color.blue,
    //   '&style=feature:poi|element:geometry|color:' + color.blue,
    //   '&style=feature:poi.park|element:geometry|color:' + color.blue,
    //   '&style=feature:poi.business|visibility:off',
    //   '&style=feature:poi.attraction|visibility:off',
    //   '&style=feature:road.local|element:geometry|color:' + color.white,
    // ].join('');
    // const feature3 = '&style=feature:road|visibility:off';

    const MARKERS = {
      'Kresge College': {lat: '36.9972381', long: '-122.0667945'},
      'Porter College': {lat: '36.9943943', long: '-122.0652214'},
      'Rachel Carson (Col. 8) College': {lat: '36.9917', long: '-122.0650'},
      'Oakes College': {lat: '36.9894', long: '-122.0646362'},

      'College 9': {lat: '37.0025', long: '-122.0570'},
      'College 10': {lat: '37.00001', long: '-122.0586'},
      'Crown/Merrill Apartments': {lat: '37.0019539', long: '-122.0539588'},
      'Crown College': {lat: '36.9994', long: '-122.0549798'},
      'Merrill College': {lat: '36.9997926', long: '-122.0523'},
      'Cowell College': {lat: '36.9971235', long: '-122.0542672'},
      'Stevenson College': {lat: '36.9960', long: '-122.0520517'},
    };

    return this.props.leaders.map( (leader, index) => {
      let options = MARKERS[leader.site]
      let slugImage = SLUG_PINS[index];

      const MARKER_SIZE = '6.5em';
      const TEXT_WIDTH = '11em';
      const TEXT_HEIGHT = '4.4em';
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: TEXT_WIDTH,
        height: TEXT_HEIGHT,
        backgroundColor: 'white',
        padding: '5px',
        border: '2.5px #B1AFAF solid',
        borderRadius: '5px',
        boxSizing: 'border-box',
        fontSize: '1em',
        color: '#898989'
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

  render() {
    return (
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            draggable: false,
          }}
          bootstrapURLKeys={{key: mapsJavascriptKey}}
          >
          {this.renderMarkers()}
        </GoogleMapReact>

     );
  }
}

const mapStateToProps = (state) => ({
  leaders: state.records.leaders
})

export default connect(mapStateToProps)(HeatMap);
