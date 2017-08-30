import React, {Component} from 'react';
import {mapsStaticKey, mapsJavascriptKey} from '../../../config.js';
import styles from '../../../App.css';
import GoogleMapReact from 'google-map-react';
import {SLUG_PINS} from '../../constants/constants';
import {connect} from 'react-redux';

// const map1 = 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=' + settings.key;


class HeatMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate (a,b) {
    console.log(this.props);

  }

  map() {
    const prefix = 'https://maps.googleapis.com/maps/api/staticmap?';

    const lat = '36.995';
    const long = '-122.060';
    const location = 'center=' + lat + ', ' + long;

    const width = '1000';
    const height = '400';
    const size = '&size=' + width + 'x' + height;
    const color = {tan: '0xdfd2ae', black: '0x000000', white: '0xffffff', blue: '0x363696'};
    const zoom = '&zoom=15';



    const features = [
      '&style=feature:landscape|element:geometry|color:' + color.blue,
      '&style=feature:poi|element:geometry|color:' + color.blue,
      '&style=feature:poi.park|element:geometry|color:' + color.blue,
      '&style=feature:poi.business|visibility:off',
      '&style=feature:poi.attraction|visibility:off',
      '&style=feature:road.local|element:geometry|color:' + color.white,
    ].join('');
    // const feature3 = '&style=feature:road|visibility:off';
    const apiKey = '&key=' + mapsStaticKey;
    return prefix + location + size + zoom + features+ markers + apiKey;
  }


      static defaultProps = {
      center: {lat: 36.995, lng: -122.060},
      zoom: 15
    };


    renderMarkers() {
      const MARKERS = {
        'Kresge': {lat: '36.9972381', long: '-122.0667945'},
        'Oakes': {lat: '36.9890294', long: '-122.0646362'},
        'Porter': {lat: '36.9943943', long: '-122.0652214'},
        'College Eight': {lat: '36.9911913', long: '-122.0647242'},
        'College Nine and Ten': {lat: '36.9911913', long: '-122.0647242'},
        'Cowell-Stevenson': {lat: '36.9911913', long: '-122.0647242'},
        'Crown-Merrill': {lat: '36.9911913', long: '-122.0647242'},
      };

      return this.props.leaders.map( (leader, index) => {
        let options = MARKERS[leader.site]
        let slugImage = SLUG_PINS[index];

        return (
          <div
            lat={options.lat}
            lng={options.long}
            key={index}
            style={{
              height: '70px',
              width: '70px',
              backgroundImage: `url(${slugImage})`,
              backgroundSize: 'contain',
            }}
            ></div>
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
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}

  render() {
    return (
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{zoomControl: false,
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
