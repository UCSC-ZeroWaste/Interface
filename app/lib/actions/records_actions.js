import Api from '../services/api';
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
// export const UPDATE_RECORDS = 'UPDATE_RECORDS';
// export const GET_RECORDS = 'GET_RECORDS';

// const fetchRecordsAPI = () => {Api.get('http://zerowaste.ucsc.edu:3001/api/db')};

export const receiveRecords = (records) => ({
  type: RECEIVE_RECORDS,
  records
});

export const receiveError = (error) => ({
  type: RECEIVE_ERROR,
  error: 'There was a problem getting the records.'
});

export const fetchRecords = () => (dispatch) => {
  console.log('hit fetchRecords');
  return (

  Api.get('http://zerowaste.ucsc.edu:3001/api/db')
    .then((records) => dispatch(receiveRecords(records)))
    .catch((error) => dispatch(receiveError(error)))
);};
