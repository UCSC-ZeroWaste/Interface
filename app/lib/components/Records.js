import React, {Component} from 'react';

import Store from '../stores/Store';
import ActionCreator from '../actions/ActionCreator';

import SelectRecord from './SelectRecord.js';
import LeaderBoard from './data_views/LeaderBoard.js';


export default class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {records: []};
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this._onChange);
  }
  // Use the ActionCreator to get the records.
  componentDidMount() {
    ActionCreator.getRecords();
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }
  /**
   ** Update the state of records for this component.
   ** This will get called when our store handles the response
   ** from the action.
   **/
  _onChange() {
    this.setState({
      records: Store.getRecords()
    });
  }

  render() {
    return (
      <div>
        <SelectRecord records={this.state.records}/>
        <LeaderBoard records={this.state.records}/>
      </div>
      );
  }
}
