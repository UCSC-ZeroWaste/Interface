import React, {Component} from 'react';
import {mapsAPI} from '../../../config.js';
import {MARKERS} from '../../constants/constants';

// const map1 = 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=' + settings.key;

export default class HeatMap extends Component {
  constructor(props) {
    super(props);
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
    // &markers=color:blue%7Clabel:S%7C62.107733,-145.541936
    const markers = MARKERS.map( (site) => '&markers=color:blue%7Csize:large%7Clabel:A%7C' + site.location).join('');

    const features = [
      '&style=feature:landscape|element:geometry|color:' + color.tan,
      '&style=feature:poi|element:geometry|color:' + color.tan,
      '&style=feature:poi.park|element:geometry|color:' + color.tan,
      '&style=feature:poi.business|visibility:off',
      '&style=feature:poi.attraction|visibility:off',
      '&style=feature:road.local|element:geometry|color:' + color.white,
    ].join('');
    // const feature3 = '&style=feature:road|visibility:off';
    const apiKey = '&key=' + mapsAPI;
    return prefix + location + size + zoom + features+ markers + apiKey;
  }

  render() {
    return(
      <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center'}}>
        <img
          src={this.map()}
          style={{height: '95%', width: '65%', opacity: '.6'}}
          onLoad={() => {window.dispatchEvent(new Event('resize'));}}
          ></img>
      </div>
    );
  }
}

//
