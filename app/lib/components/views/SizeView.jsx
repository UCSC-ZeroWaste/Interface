import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

class SizeView extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        RELATIVE SIZE VIEW GOES HERE
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  siteRecords: _.groupBy(state.records, 'Site')[state.site],
  site: state.site
});

export default connect(mapStateToProps)(SizeView);
