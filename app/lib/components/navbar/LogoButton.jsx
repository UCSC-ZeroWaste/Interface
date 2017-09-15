import React, {Component} from 'react';
import styles from '../../../App.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class LogoButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if (this.props.device === 'home') {
      this.props.history.push(`/home`);
    }
  }

  render() {
    return (
      <button
        className={styles.logo}
        onClick={this.clickHandler}
        >
        ZERO
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  device: state.currentView.device
});

export default withRouter(connect(mapStateToProps)(LogoButton));
