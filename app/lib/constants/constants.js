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

const red11 = ‘#ED6046’;
const darkorange10 = ‘#FC7E48’
const orange9 = ‘#FCA248’;
const lightorange8 = ‘#F5BA5B’;
const yellow7 = ‘#efd553’;
const lightgreen6 = ‘#D2EA70’;
const grassgreen5= ‘#B4E66D’;
const midgreen4 = ‘#89D48A’;
const bluegreen3= ‘#4DC79D’;
const turquoise2 = ‘#39C4BF’;
const blue1= ‘#39B9C4’;

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
