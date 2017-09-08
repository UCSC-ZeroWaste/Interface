import {RECEIVE_RECORDS, RECEIVE_ERROR} from '../actions/record_actions';
import {COLLEGE_SET} from '../constants/constants';
import _ from 'underscore';
import merge from 'lodash/merge';

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
  const firstPickupDate = new Date(data[0].PickupTime);
  const lastPickupDate = new Date(data[data.length - 1].PickupTime);

  let relevantPickups = data.filter(function(pickup){
    return COLLEGE_SET.includes(pickup.Location);
  });
  let filteredData = _.groupBy(relevantPickups, 'Location');

  let leaders = COLLEGE_SET.map( (siteName) => {
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

  return {data: filteredData, leaders: leaders, dateRange: [firstPickupDate, lastPickupDate]};
}

export default RecordsReducer;
