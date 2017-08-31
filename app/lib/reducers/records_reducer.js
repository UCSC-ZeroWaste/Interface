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
  let relevantPickups = data.filter(function(pickup){
    return COLLEGE_SET.includes(pickup.Site);
  });
  let filteredData = _.groupBy(relevantPickups, 'Site');

  let leaders = COLLEGE_SET.map( (siteName) => {
    //TODO Need to ensure that this doesn't fail if filteredData === undefined (i.e. no data is returned). Also need to think about what happens if there is no data for a certain site -- will anything break? Maybe consider setting up tests instead.
    let sitePickups = filteredData[siteName];
    let totalLoad = _.reduce(sitePickups, (sum, pickup) => { return sum + pickup.Load; }, 0);
    let loadWithoutRefuse = _.reduce(sitePickups, (sum, pickup) => pickup.Product === "Refuse" ? sum : sum + pickup.Load , 0);
    let greenRatio = (loadWithoutRefuse/totalLoad) * 100;
    return  { site: siteName,
              totalLoad: totalLoad,
              loadWithoutRefuse: loadWithoutRefuse,
              greenRatio: greenRatio
            };
  }).sort( (siteA, siteB) => siteB.greenRatio - siteA.greenRatio );

  return {data: filteredData, leaders: leaders};
}

export default RecordsReducer;
