import {RECEIVE_RECORDS, RECEIVE_ERROR} from '../actions/record_actions';
import {COLLEGE_NAMES} from '../constants/constants';
import _ from 'underscore';
import merge from 'lodash/merge';
import moment from 'moment';

const nullState = Object.freeze({data: null, errors: null, leaders: null});

const RecordsReducer = (state = nullState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RECORDS:
      let parsedData = parsePickupData(action.pickupData);
      return merge({}, nullState, parsedData);
    case RECEIVE_ERROR:
      return merge({}, nullState, {errors: action.errors});
    default:
      return state;
  }
};


function parsePickupData(data) {
  // let firstPickupDate = new Date(data[0].PickupTime);
  // firstPickupDate = moment(firstPickupDate).startOf('day');

  // let firstPickupDate = moment(data[0].PickupTime.slice(0,9));
  // console.log(firstPickupDate);
  // console.log(data[0].PickupTime.slice(0,10));

  // let firstPickupDate = new Date(data[0].PickupTime.slice(0,10));
  // let lastPickupDate = new Date(data[data.length - 1].PickupTime.slice(0,10));

//
// var momentObj = moment(dateObj);
// var momentString = momentObj.format('YYYY-MM-DD');

  if (data.length === 0) return nullState;

  let firstPickupDate = moment(data[0].PickupTime.slice(0,10)).startOf('day');
  let lastPickupDate = moment(data[data.length - 1].PickupTime.slice(0,10)).startOf('day');
  console.log(firstPickupDate,lastPickupDate);

  const daysInRange = lastPickupDate.diff(firstPickupDate, 'days') + 1;
  console.log(daysInRange);

  firstPickupDate = firstPickupDate.format('YYYY-MM-DD');
  lastPickupDate = lastPickupDate.format('YYYY-MM-DD');

  // Math.floor(Math.abs((firstPickupDate.valueOf() - lastPickupDate.valueOf()) / (3600 * 24 * 1000)));

  let relevantPickups = data.filter(function(pickup){
    return COLLEGE_NAMES.includes(pickup.Location);
  });
  let filteredData = _.groupBy(relevantPickups, 'Location');

  let leaders = COLLEGE_NAMES.map( (siteName) => {
    //TODO Need to ensure that this doesn't fail if filteredData === undefined (i.e. no data is returned). Also need to think about what happens if there is no data for a certain site -- will anything break? Maybe consider setting up tests instead.
    let sitePickups = filteredData[siteName];
    let totalRefuse = _.reduce(sitePickups, (sum, pickup) => pickup.Diversion_Type === "Refuse" ? sum + pickup.Load_Split : sum , 0);
    let totalDiverted = _.reduce(sitePickups, (sum, pickup) => pickup.Diversion_Type === "Diverted" ? sum + pickup.Load_Split : sum , 0);
    let totalLoad = totalRefuse + totalDiverted;
    let diversionRatio = (totalDiverted/totalLoad) * 100;

    return  { site: siteName,
              totalRefuse,
              totalDiverted,
              totalLoad,
              diversionRatio
            };
    // return  { site: siteName,
    //           totalLoad: totalLoad,
    //           loadWithoutRefuse: loadWithoutRefuse,
    //           greenRatio: greenRatio
    //         };
  }).sort( (siteA, siteB) => siteB.diversionRatio - siteA.diversionRatio );

  return {data: filteredData, leaders: leaders, daysInRange, dateRange: [firstPickupDate, lastPickupDate]};
}

export default RecordsReducer;
