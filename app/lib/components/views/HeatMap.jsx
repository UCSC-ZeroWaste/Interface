import React, {Component} from 'react';
import {mapsStaticKey, mapsJavascriptKey} from '../../../config.js';
import styles from '../../../App.css';
import GoogleMapReact from 'google-map-react';
import {SLUG_PINS} from '../../constants/constants';
import {connect} from 'react-redux';

const Marker = ({text, containerStyle, textStyle, markerStyle}) => {
  return (
    <div style={containerStyle}>
      <div style={markerStyle}/>
      <div style={textStyle}> {text} </div>
    </div>
  )
}

class HeatMap extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    center: {lat: 36.997, lng: -122.060},
    zoom: 15
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
      'Kresge': {lat: '36.9972381', long: '-122.0667945'},
      'Oakes': {lat: '36.9890294', long: '-122.0646362'},
      'Porter': {lat: '36.9943943', long: '-122.0652214'},
      'College Eight': {lat: '36.9911913', long: '-122.0647242'},
      'College Nine and Ten': {lat: '37.001788', long: '-122.057529'},
      'Cowell-Stevenson': {lat: '36.997912', long: '-122.051273'},
      'Crown-Merrill': {lat: '37.002078', long: '-122.053759'},
    };

    return this.props.leaders.map( (leader, index) => {
      let options = MARKERS[leader.site]
      let slugImage = SLUG_PINS[index];

      const MARKER_SIZE = 100;
      const TEXT_WIDTH = 80;
      const TEXT_HEIGHT = 30;

      const containerStyle = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: MARKER_SIZE + TEXT_WIDTH,
        height: MARKER_SIZE,
        left: -MARKER_SIZE / 2,
        top: -MARKER_SIZE,
      }

      const textStyle = {
        display: 'flex',
        width: TEXT_WIDTH,
        backgroundColor: 'white',
        border: '1px grey solid',
        borderRadius: '3px',
        boxSizing: 'border-box',
      }

      const markerStyle = {
        width: MARKER_SIZE,
        height: MARKER_SIZE,
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
          text={leader.site}
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