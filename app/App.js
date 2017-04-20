import React from 'react';
import styles from './App.css';

var _ = require('underscore');
var Store = require('./lib/stores/Store');
var ActionCreator = require('./lib/actions/ActionCreator');

var Record = React.createClass({
  getInitialState: function () {
    return {
      records: []
    };
  },

  componentWillMount: function () {
    Store.addChangeListener(this._onChange);
  },
  // Use the ActionCreator to get the records.
  componentDidMount: function () {
    ActionCreator.getRecords();
  },

  componentWillUnmount: function () {
    Store.removeChangeListener(this._onChange);
  },
  /**
   ** Update the state of categories for this component.
   ** This will get called when our store handles the response
   ** from the action.
   **/
  _onChange: function () {
    this.setState({
      records: Store.getRecords()
    });
  },

  render: function () {
    var records;
    if (this.state.records.recordset) {
      var sites = _.groupBy(this.state.records.recordset,
          'CustomerName');
      var siteOptions = _.map(sites, function (record, site) {
          console.log(record, site)
          return <option key={ site }
          value={ record }>
          { site }</option>;
        })
    }

    return (
        <div>
          <select name="record">
          <option value="">Select a Site</option>
          { siteOptions  }
          </select>
        </div>
        );
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {
    return (
      <div>
        <Record/>
        <div className={styles.bap}>
          bar
        </div>
      </div>
    );
  }
}
