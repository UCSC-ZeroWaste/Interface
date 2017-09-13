import * as Api from '../services/api';
import dummyData from '../assets/dummyData';
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const receiveRecords = (pickupData) => ({
  type: RECEIVE_RECORDS,
  pickupData
});

export const receiveError = (errors) => ({
  type: RECEIVE_ERROR,
  errors
});

//TODO need to set up error handling -- maybe do this for TDD?
export const fetchRecords = (url) => (dispatch) => (
  Api.fetchRecords(url)
    .then((response) => dispatch(receiveRecords(response)))
    .catch((error) => dispatch(receiveError(error)))
);

export const fetchDummyRecords = () => (dispatch) => (
  dispatch(receiveRecords(dummyData))
);
