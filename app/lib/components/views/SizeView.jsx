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
});

export default connect(mapStateToProps)(SizeView);
