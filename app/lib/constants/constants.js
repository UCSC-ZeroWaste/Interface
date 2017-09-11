// export const COLLEGE_SET = [
//   "College Nine and Ten",
//   "Cowell-Stevenson",
//   "Crown-Merrill",
//   "Kresge",
//   "Oakes",
//   "Porter",
//   "College Eight"
// ];

//location field
export const COLLEGE_SET = [
  "College 9",
  "College 10",
  "Cowell College",
  "Crown College",
  "Crown/Merrill Apartments",
  "Kresge College",
  "Merrill College",
  "Oakes College",
  "Porter College",
  "Rachel Carson (Col. 8) College",
  "Stevenson College",
];

//field: Diversion_Type
//TODO update Green Ratio Chart with this info
export const DIVERSION_TYPES = [
  "Diverted",
  "Refuse",
];

export const API_SAMPLE = {
  PickupTime: "2017-08-09T00:13:00.000Z",
  Year_Month: "2017-08",
  Month_Num: 8,
  Week_Num: "2017-32",
  LoadmanAcct: 907,
  LoadName: "RR-CMK-OR",
  LoadName_Split: "RR-CMK-OR",
  Product: "Compost",
  Diversion_Type: "Diverted",
  ContainerType: "Roll Off",
  Size_CY: 20,
  Location: "Crown College",
  Location_Type: "Dining",
  Load_Split: 12120
};

export const API_SAMPLE_RELEVANT = {
  PickupTime: "2017-08-09T00:13:00.000Z",
  Product: "Compost",
  Diversion_Type: "Diverted",
  Location: "Crown College",
  Load_Split: 12120
};

//Product (there are others too but not including)
export const WASTE_TYPES = [
  'Cardboard',
  'GreenWaste',
  'Mixed Recycle',
  'Refuse',
  'PRODUCT  UNKNOWN'
];

const red = '#fc7e48';
const orange = '#ffab4f';
const yellow = '#efd553';
const lightgreen = '#d6ee72';
const green= '#89d48a';
const bluegreen= '#2fcfa8';
const blue= '#39bdc4';
const temp = 'black';

export const LEADER_BOARD_COLORS = [
  blue,
  bluegreen,
  green,
  lightgreen,
  yellow,
  orange,
  red,
  temp,
  temp,
  temp,
  temp,
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
  saddest,
  saddest,
  saddest,
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
  pin_saddest,
  pin_saddest,
  pin_saddest,
  pin_saddest,
];

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
