import React, {Component} from 'react';
import {mapsStaticKey, mapsJavascriptKey} from '../../../config.js';
import styles from '../../../App.scss';
import GoogleMapReact from 'google-map-react';
// import { fitBounds } from 'google-map-react/utils';
import {SLUG_PINS} from '../../constants/constants';
import {MAP_STYLE} from '../../constants/settings';
import {connect} from 'react-redux';
import ContainerDimensions from 'react-container-dimensions';
import {COLLEGE_INFO} from '../../constants/constants';
import {withRouter} from 'react-router-dom';

const Marker = ({site, rank, containerStyle, textStyle, markerStyle}) => {
  function getDegree(siteRank) {
    switch (siteRank) {
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
};

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.createMapOptions = this.createMapOptions.bind(this);
  }

  renderMarkers() {
    return this.props.leaders.map( (leader, index) => {
      let options = COLLEGE_INFO[leader.site];
      let slugImage = SLUG_PINS[index];

      if (this.props.device === 'touchscreen') {
        var MARKER_SIZE = 6.5;
        var TEXT_WIDTH = 11;
        var TEXT_HEIGHT = 4.4;
        var MARGIN = .5;
        var fontSize = '1em';
      } else {
        MARKER_SIZE = 4.0;
        TEXT_WIDTH = 12;
        TEXT_HEIGHT = 4.0;
        MARGIN = .25;
        fontSize = '.75em';
      }
      const CONTAINER_HEIGHT = MARKER_SIZE + TEXT_HEIGHT;
      const CONTAINER_ADJUST_LEFT = -TEXT_WIDTH / 2;
      const CONTAINER_ADJUST_TOP = -MARKER_SIZE;

      // console.log('height: MARKER_SIZE + TEXT_HEIGHT', MARKER_SIZE + TEXT_HEIGHT,
      // 'left: -TEXT_WIDTH / 2', -TEXT_WIDTH / 2,
      // 'top: -MARKER_SIZE', -MARKER_SIZE);

      const containerStyle = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 'auto',
        height: CONTAINER_HEIGHT + 'em',
        left: CONTAINER_ADJUST_LEFT + 'em',
        top: CONTAINER_ADJUST_TOP + 'em',
      };

      const textStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: TEXT_WIDTH + 'em',
        height: TEXT_HEIGHT + 'em',
        backgroundColor: 'white',
        padding: '5px',
        border: '2.5px #B1AFAF solid',
        borderRadius: '5px',
        boxSizing: 'border-box',
        fontSize: fontSize,
        color: '#898989'
      };

      const markerStyle = {
        width: MARKER_SIZE + 'em',
        height: MARKER_SIZE + 'em',
        marginBottom: MARGIN + 'em',
        backgroundImage: `url(${slugImage})`,
        backgroundSize: 'cover',
      };

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
      );
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

  render() {
    return (
      <GoogleMapReact
        ref='map'
        defaultCenter={{lat: 36.9955, lng: -122.060}}
        defaultZoom={this.props.device === 'touchscreen' ? 16 : 15}
        options={this.createMapOptions}
        bootstrapURLKeys={{key: mapsJavascriptKey}}
        >
        {this.renderMarkers()}
      </GoogleMapReact>
     );
  }
}

const mapStateToProps = (state) => ({
  leaders: state.records.leaders,
  device: state.currentView.device
});

export default withRouter(connect(mapStateToProps)(HeatMap));
