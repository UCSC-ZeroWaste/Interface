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
        RENDER SIZE VIEW
        show relative size of trash using cartoon visuals
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  siteRecords: _.groupBy(state.records, 'Site')[state.site],
  site: state.site
});

export default connect(mapStateToProps)(SizeView);
