import {COLLEGE_NAMES, DIVERSION_TYPES, WASTE_TYPES, API_SAMPLE_RELEVANT} from '../constants/constants';
import _ from 'underscore';
import moment from 'moment';

const settings = {
  dataRows: 500,
  diversionRatioArray: COLLEGE_NAMES.map( () => Math.random() ),
  recordFields: Object.keys(API_SAMPLE_RELEVANT)
};

const getTime = function () {
  let begDate = new Date('2017-09-15').valueOf();
  let endDate = new Date('2017-10-11').valueOf();
  let diff = endDate - begDate;
  let newDate = new Date(begDate + (diff * Math.random()));
  return newDate.toISOString();
};

const getLoadSplit = function() {
  let min = 50;
  let maxDiff = 1000;
  let load = min + (maxDiff * Math.random());
  return load;
};

const createDataSet = function () {
  let recordSet = [];

  for(let i = 0; i < settings.dataRows; i++) {
    let index = i % (COLLEGE_NAMES.length);
    let randomNum = Math.random();
    let Diversion_Type = ( settings.diversionRatioArray[index] < randomNum ? DIVERSION_TYPES[0] : DIVERSION_TYPES[1]);
    let Product = (Diversion_Type === 'Refuse' ? 'Refuse' : _.sample(WASTE_TYPES.filter( (type) => type != 'Refuse')) );
    let record = {
      PickupTime: getTime(),
      Product,
      Diversion_Type,
      Location: COLLEGE_NAMES[index],
      Load_Split: getLoadSplit()
    };
    recordSet.push(record);
  }

  //TODO should fix this so that it sorts by milliseconds instead
  return recordSet.sort((objA, objB) => moment(objA.PickupTime).diff(moment(objB.PickupTime)));
  // return recordSet.sort((objA, objB) => Number(objA.PickupTime.slice(0,10).split("-").join("")) - Number(objB.PickupTime.slice(0,10).split("-").join("")));
};

export default createDataSet();

// export const API_SAMPLE_RELEVANT = {
//   PickupTime: "2017-08-09T00:13:00.000Z",
//   Product: "Compost",
//   Diversion_Type: "Diverted",
//   Location: "Crown College",
//   Load_Split: 12120
// };

// export const WASTE_TYPES = [
//   'Cardboard',
//   'GreenWaste',
//   'Mixed Recycle',
//   'Refuse',
//   'PRODUCT  UNKNOWN'
// ];

// export const DIVERSION_TYPES = [
//   "Diverted",
//   "Refuse",
// ];
