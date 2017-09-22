import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import moment from 'moment';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  renderTableRows() {
    let table = [];
    console.log('parsing data for table');
    return _.map(this.props.data, (sitePickups, site, list) => {
      console.log(list);
      let refusePickups = 0;
      let divertedPickups = 0;
      sitePickups.forEach( (pickup) => {
        if (pickup.Diversion_Type === 'Refuse') {
          refusePickups = refusePickups + 1;
        } else {
          divertedPickups = divertedPickups + 1;
        }
      });

      let row = [
        site,
        refusePickups,
        refusePickups * 7/this.props.daysInRange,
        divertedPickups,
        divertedPickups * 7/this.props.daysInRange,
      ];

      return (
        <tr key={site}>
          {row.map( (cellValue, index) => <td key={index}>{cellValue}</td>)}
        </tr>
      );

    });
  }

  render() {
    return(
      <table>
        <caption>Pickups for {this.props.dateRange.map( (dateString) => moment(dateString).format('MMM DD')).join(" to ")} ({this.props.daysInRange} days)</caption>
        <thead>
          <tr>
            <th>College</th>
            <th>Refuse - Total</th>
            <th>Refuse - Weekly</th>
            <th>Diverted - Total</th>
            <th>Diverted - Weekly</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.records.data,
  daysInRange: state.records.daysInRange,
  dateRange: state.records.dateRange
});

export default connect(mapStateToProps)(Table);
