import * as Api from '../services/api';
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const receiveRecords = (pickupData) => ({
  type: RECEIVE_RECORDS,
  pickupData
});

export const receiveError = (error) => ({
  type: RECEIVE_ERROR,
  error: 'There was a problem getting the records.'
});

//TODO need to set up error handling -- maybe do this for TDD?
export const fetchRecords = () => (dispatch) => (
  Api.fetchRecords('http://zerowaste.ucsc.edu:3001/api/db')
    .then((response) => dispatch(receiveRecords(response.recordset)))
    .catch((error) => dispatch(receiveError(error)))
);
