import React, {Component} from 'react';
import {mapsStaticKey, mapsJavascriptKey} from '../../../config.js';
import styles from '../../../App.css';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import {SLUG_PINS} from '../../constants/constants';
import {MAP_STYLE} from '../../constants/settings';
import {connect} from 'react-redux';
import ContainerDimensions from 'react-container-dimensions';
import {COLLEGE_INFO} from '../../constants/constants';
import {withRouter} from 'react-router-dom';

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
           {COLLEGE_INFO[site].shortName}
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
  static defaultProps = {
    center: {lat: 36.9935, lng: -122.060},
    zoom: 15,
  };
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
    return this.props.leaders.map( (leader, index) => {
      let options = COLLEGE_INFO[leader.site]
      let slugImage = SLUG_PINS[index];

      if (this.props.device === 'touchscreen') {
        var MARKER_SIZE = '6.5em';
        var TEXT_WIDTH = '11em';
        var TEXT_HEIGHT = '4.4em';
        var MARGIN = '.5em';
        var fontSize = '1em';
      } else {
        MARKER_SIZE = '4.0em';
        TEXT_WIDTH = '12em';
        TEXT_HEIGHT = '4.0em';
        MARGIN = '.25em';
        var fontSize = '.75em';
      }

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
        fontSize: fontSize,
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
          lng={options.lng}
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
              nw: {lat: 37.003819, lng: -122.072791},
              se: {lat: 36.988039, lng: -122.049016},
            };
    const size = {
      width, // Map width in pixels
      height // Map height in pixels
    };

    const {center, zoom} = fitBounds(bounds, size);

    return (
      <GoogleMapReact
        ref='map'
        defaultCenter={this.props.center}
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
  leaders: state.records.leaders,
  device: state.currentView.device
});

export default withRouter(connect(mapStateToProps)(HeatMap));
