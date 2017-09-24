import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {mapsStaticKey, mapsJavascriptKey} from '../../../config.js';
import styles from '../../../App.scss';

// const map1 = 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=' + settings.key;

export class HeatMap extends Component {
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

    // "College Nine and Ten"
    // "Cowell-Stevenson"
    // "Crown-Merrill"
    const MARKERS = [
      {name: 'Kresge', location: '36.9972381,-122.0667945'},
      {name: 'Oakes', location: '36.9890294,-122.0646362'},
      {name: 'Porter', location: '36.9943943,-122.0652214'},
      {name: 'College Eight', location: '36.9911913,-122.0647242'}
    ];

    const markers = MARKERS.map( (site) => '&markers=color:blue%7Csize:large%7Clabel:A%7C' + site.location).join('');

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

  render() {
          // const mapStyle = {{width: '100%', height: '100%', position: 'relative'}}

          // <div style={{height: '100%', width: '100%', display: 'flex', position: 'relative'}}>
          // <div
          //   style={{width: '100vw', height: '80vh', display: 'flex', position: 'static', zIndex: '20', backgroundColor: 'blue'}}
          //   > </div>
    return (
        <Map
          google={this.props.google}
          clickableIcons={false}
          containerStyle={{height: '80vh', width: '100%', display: 'flex', position: 'static'}}
          style={{width: '100%', height: '100%', display: 'flex', position: 'static'}}
          initialCenter={{
            lat: 36.995,
            lng: -122.060
          }}
          zoom={15}>

        </Map>

        );
  }
}

export default GoogleApiWrapper({
  apiKey: mapsJavascriptKey
})(HeatMap)

// <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center'}}>
//   <img
//     src={this.map()}
//     style={{height: '95%', width: '65%', opacity: '1'}}
//     onLoad={() => {window.dispatchEvent(new Event('resize'));}}
//     ></img>
// </div>
//
