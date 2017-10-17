import {RECEIVE_RECORDS, RECEIVE_ERROR} from '../actions/record_actions';
import {COLLEGE_NAMES} from '../constants/constants';
import {LINE_CHART_DATA_POINT_SETTINGS, SCATTER_CHART_DATA_POINT_SETTINGS, ROLLING_AVERAGE_SPAN} from '../constants/settings';
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
  let firstPickupDate = moment(data[0].PickupTime.slice(0,10)).startOf('day');
  let lastPickupDate = moment(data[data.length - 1].PickupTime.slice(0,10)).startOf('day');
  const daysInRange = lastPickupDate.diff(firstPickupDate, 'days') + 1;

  firstPickupDate = firstPickupDate.format('YYYY-MM-DD');
  lastPickupDate = lastPickupDate.format('YYYY-MM-DD');
  const dateRange = [firstPickupDate, lastPickupDate];

  let relevantPickups = data.filter(function(pickup){
    return COLLEGE_NAMES.includes(pickup.Location);
  });
  let groupDataBySite = _.groupBy(relevantPickups, 'Location');

  let leaders = calculateLeaders(groupDataBySite);
  let leaderBoardOrder = leaders.map( leader => leader.site );
  // let leaderBoardOrder = ['chart_fix'].concat(leaders.map( leader => leader.site ));
  // console.log(leaderBoardOrder);
  let refusePlotPoints = calculatePlotPoints('refuse', groupDataBySite, leaderBoardOrder);
  let diversionPlotPoints = calculatePlotPoints('diversion', groupDataBySite, leaderBoardOrder, dateRange, daysInRange);

  // console.log(refusePlotPoints);
  // console.log(diversionPlotPoints);
  return {
    data: groupDataBySite,
    leaders,
    daysInRange,
    dateRange,
    refusePlotPoints,
    diversionPlotPoints
  };
}

function calculateLeaders (groupDataBySite) {
  return COLLEGE_NAMES.map( (siteName) => {
    //TODO Need to ensure that this doesn't fail if groupDataBySite === undefined (i.e. no data is returned). Also need to think about what happens if there is no data for a certain site -- will anything break? Maybe consider setting up tests instead.
    let sitePickups = groupDataBySite[siteName];
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
  }).sort( (siteA, siteB) => siteB.diversionRatio - siteA.diversionRatio );
}

function calculatePlotPoints(chartType, dataSet, leaderBoardOrder, dateRange, daysInRange) {
  if (chartType === 'diversion') {
    return leaderBoardOrder.map( (siteName) => parseDiversionData(siteName, dataSet, dateRange, daysInRange) );
  } else {
    return leaderBoardOrder.map( (siteName) => parseRefuseData(siteName, dataSet) );
  }
}

function parseDiversionData(siteName, dataSet, dateRange, daysInRange) {
  // if (siteName === 'chart_fix') {
  //   return ({
  //     name: siteName,
  //     values: {
  //       y : 1,
  //       x : new Date(dateRange[0])
  //     }
  //   });
  // }

  let sitePickups = dataSet[siteName];
  let oneDayInMsec = 24 * 60 * 60 * 1000;
  let begDateInMsec = new Date(dateRange[0]).valueOf();
  let endDateInMsec = new Date(dateRange[1]).valueOf() + oneDayInMsec;
  let timeDiff = endDateInMsec - begDateInMsec;

  //create empty arrays of n days
  let totalDiverted = Array(daysInRange).fill(0);
  let totalRefuse = Array(daysInRange).fill(0);

  sitePickups.forEach( (pickup, i) => {
    let thisDateInMsec = new Date(pickup.PickupTime).valueOf();
    let day = Math.floor((thisDateInMsec - begDateInMsec) / oneDayInMsec);
    if (pickup.Diversion_Type === 'Refuse') {
      totalRefuse[day] += pickup.Load_Split;
    } else if (pickup.Diversion_Type === 'Diverted') {
      totalDiverted[day] += pickup.Load_Split;
    }
  });

  let diversionRatio = [];
  for (let i = 0 ; i < daysInRange - ROLLING_AVERAGE_SPAN; i++) {
    let diverted = totalDiverted
      .slice(i, i + ROLLING_AVERAGE_SPAN)
      .reduce( (total, load) => total + load);
    let refuse = totalRefuse
      .slice(i, i + ROLLING_AVERAGE_SPAN)
      .reduce( (total, load) => total + load);
    diversionRatio.push(
      Math.floor(100 * diverted /( refuse + diverted ))
    );
  }

  diversionRatio = diversionRatio
    .map((ratio, i) => ({
      y : ratio,
      x : new Date(begDateInMsec + (i + ROLLING_AVERAGE_SPAN) * oneDayInMsec)
    }));

  return merge({
    name: siteName,
    values: diversionRatio
    },
    LINE_CHART_DATA_POINT_SETTINGS
  );
}

function parseRefuseData(siteName, dataSet) {
  // if (siteName === 'chart_fix') {
  //   return ({
  //     name: siteName,
  //     values: {
  //       x : new Date('2017-09-22'),
  //       y : 1,
  //     }
  //   });
  // }

  let sitePickups = dataSet[siteName]
  .filter( (datum) => (datum.Product === 'Refuse'))
  .map((datum, i) => ({
    'x' : new Date(datum.PickupTime),
    'y' : datum.Load_Split,
    'seriesName': siteName
  }));

  return merge({
    name: siteName,
    values: sitePickups,
    },
    SCATTER_CHART_DATA_POINT_SETTINGS
  );
}

export default RecordsReducer;
