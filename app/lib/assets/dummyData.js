import {COLLEGE_SET, DIVERSION_TYPES, WASTE_TYPES, API_SAMPLE_RELEVANT} from '../constants/constants';

const settings = {
  dataRows: 1000,
  diversionRatioArray: COLLEGE_SET.map( () => Math.random() ),
  recordFields: Object.keys(API_SAMPLE_RELEVANT)
};

const getTime = function () {
  let begDate = new Date('2017-04-15').valueOf();
  let endDate = new Date('2017-05-25').valueOf();
  let diff = endDate - begDate;
  let newDate = new Date(begDate + (diff * Math.random()));
  return newDate.toISOString();
};

const getLoadSplit = function() {
  let min = 500;
  let maxDiff = 500;
  let load = min + (maxDiff * Math.random());
  return load;
};

const createDataSet = function () {
  let recordSet = [];

  for(let i = 0; i < settings.dataRows; i++) {
    let index = i % (COLLEGE_SET.length);
    let randomNum = Math.random();
    let Diversion_Type = ( settings.diversionRatioArray[index] < randomNum ? DIVERSION_TYPES[0] : DIVERSION_TYPES[1]);
    let Product = (Diversion_Type === 'Refuse' ? 'Refuse' : 'Compost');
    let record = {
      PickupTime: getTime(),
      Product,
      Diversion_Type,
      Location: COLLEGE_SET[index],
      Load_Split: getLoadSplit()
    };
    recordSet.push(record);
  }
  return recordSet;
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
