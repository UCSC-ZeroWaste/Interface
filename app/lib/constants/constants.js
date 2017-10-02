// export const COLLEGE_NAMES = [
//   "College Nine and Ten",
//   "Cowell-Stevenson",
//   "Crown-Merrill",
//   "Kresge",
//   "Oakes",
//   "Porter",
//   "College Eight"
// ];

export const COLLEGE_INFO = {
  "College 9": {shortName: "College 9", lat: 37.0018, lng: -122.0568},
  "College 10": {shortName: "College 10", lat: 37.0003, lng: -122.0589},
  "Cowell College": {shortName: "Cowell College", lat: 36.9970, lng: -122.0544},
  "Crown College": {shortName: "Crown College", lat: 36.9995, lng: -122.0555},
  "Crown/Merrill Apartments": {shortName: "Crown/Merrill Apts", lat: 37.0019, lng: -122.0537},
  "Kresge College": {shortName: "Kresge College", lat: 36.9975, lng: -122.0668},
  "Merrill College": {shortName: "Merrill College", lat: 36.9998, lng: -122.0526},
  "Oakes College": {shortName: "Oakes College", lat: 36.9894, lng: -122.0630},
  "Porter College": {shortName: "Porter College", lat: 36.9944, lng: -122.0653},
  "Rachel Carson (Col. 8) College": {shortName: "R. Carson College", lat: 36.9911, lng: -122.0653},
  "Stevenson College": {shortName: "Stevenson College", lat: 36.9965, lng: -122.0515},
};

export const COLLEGE_NAMES = Object.keys(COLLEGE_INFO);

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

const red11 = '#ED6046';
const darkorange10 = '#FC7E48';
const orange9 = '#FCA248';
const lightorange8 = '#F5BA5B';
const yellow7 = '#efd553';
const lightgreen6 = '#D2EA70';
const grassgreen5= '#B4E66D';
const midgreen4 = '#89D48A';
const bluegreen3= '#4DC79D';
const turquoise2 = '#39C4BF';
const blue1= '#39B9C4';

export const LEADER_BOARD_COLORS = [
  blue1,
  turquoise2,
  bluegreen3,
  midgreen4,
  grassgreen5,
  lightgreen6,
  yellow7,
  lightorange8,
  orange9,
  darkorange10,
  red11,
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
  happy,
  neutral,
  neutral,
  sad,
  sad,
  sadder,
  sadder,
  saddest,
];

import pin1_happiest from '../assets/images/slug_map_pins/slug-pin1.png';
import pin2 from '../assets/images/slug_map_pins/slug-pin2.png';
import pin3 from '../assets/images/slug_map_pins/slug-pin3.png';
import pin4 from '../assets/images/slug_map_pins/slug-pin4.png';
import pin5 from '../assets/images/slug_map_pins/slug-pin5.png';
import pin6 from '../assets/images/slug_map_pins/slug-pin6.png';
import pin7 from '../assets/images/slug_map_pins/slug-pin7.png';
import pin8 from '../assets/images/slug_map_pins/slug-pin8.png';
import pin9 from '../assets/images/slug_map_pins/slug-pin9.png';
import pin10 from '../assets/images/slug_map_pins/slug-pin10.png';
import pin11_saddest from '../assets/images/slug_map_pins/slug-pin11.png';

export const SLUG_PINS = [
  pin1_happiest,
  pin2,
  pin3,
  pin4,
  pin5,
  pin6,
  pin7,
  pin8,
  pin9,
  pin10,
  pin11_saddest,
];
