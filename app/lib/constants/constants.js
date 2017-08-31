export const COLLEGE_SET = [
  "College Nine and Ten",
  "Cowell-Stevenson",
  "Crown-Merrill",
  "Kresge",
  "Oakes",
  "Porter",
  "College Eight"
];

export const WASTE_TYPES = [
  'Refuse',
  'Mixed Recycle',
  'Cardboard',
  'GreenWaste',
  'PRODUCT  UNKNOWN'
];

const red = '#fc7e48';
const orange = '#ffab4f';
const yellow = '#efd553';
const lightgreen = '#d6ee72';
const green= '#89d48a';
const bluegreen= '#2fcfa8';
const blue= '#39bdc4';

export const LEADER_BOARD_COLORS = [
  blue,
  bluegreen,
  green,
  lightgreen,
  yellow,
  orange,
  red,
];

import happiest from '../assets/images/emotional_slugs/Slug1.png';
import happier from '../assets/images/emotional_slugs/Slug2.png';
import happy from '../assets/images/emotional_slugs/Slug3.png';
import neutral from '../assets/images/emotional_slugs/Slug4.png';
import sad from '../assets/images/emotional_slugs/Slug5.png';
import sadder from '../assets/images/emotional_slugs/Slug6.png';
import saddest from '../assets/images/emotional_slugs/Slug7.png';

export const SLUG_IMAGES = [
  happiest,
  happier,
  happy,
  neutral,
  sad,
  sadder,
  saddest,
];

import pin_happiest from '../assets/images/slug_map_pins/slug-pin1.png';
import pin_happier from '../assets/images/slug_map_pins/slug-pin2.png';
import pin_happy from '../assets/images/slug_map_pins/slug-pin3.png';
import pin_neutral from '../assets/images/slug_map_pins/slug-pin4.png';
import pin_sad from '../assets/images/slug_map_pins/slug-pin5.png';
import pin_sadder from '../assets/images/slug_map_pins/slug-pin6.png';
import pin_saddest from '../assets/images/slug_map_pins/slug-pin7.png';

export const SLUG_PINS = [
  pin_happiest,
  pin_happier,
  pin_happy,
  pin_neutral,
  pin_sad,
  pin_sadder,
  pin_saddest,
];

export const CHART = {
  widthRatio: 0.8,
  viewBox_widthRatio: 0.65,

  heightRatio: 0.9,
  viewBox_heightRatio: 0.75,

  xAxisLabelOffset: 40,
  yAxisLabelOffset: 40,

  settings: {
    legend: true,
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

    xAxisStrokeWidth: '4',
    yAxisStrokeWidth: '4',
    xAxisTickStroke: 'white',
    yAxisTickStroke: 'white',

    xAxisTickTextStroke: 'white',
    yAxisTickTextStroke: 'white',
  }
};
