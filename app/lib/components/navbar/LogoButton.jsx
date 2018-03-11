import React, {Component} from 'react';
import styles from '../../../App.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {resetView, handleViewSelect} from '../../actions/view_actions';

class LogoButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    //TODO Need to decide whether the redux version or pathname version is better for device handling

    //pathname version:
    // let pathName = this.props.location.pathname;
    // let device = pathName.split('/')[0];
    // console.log(device);
    // if (device === 'desktop') {
    //   this.props.history.push(`/home`);
    // }

    //redux version:
    if (this.props.device === 'desktop') {
      this.props.resetView();
      this.props.history.push(`/home`);
    } else {
      this.props.handleViewSelect(0);
    }
  }

  render() {
    return (
      <button
        id="NavButton_Logo"
        className={styles.logo}
        onClick={this.clickHandler}
        >
        SLUG&nbsp;&nbsp;ZERO
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  device: state.currentView.device
});

const mapDispatchToProps = (dispatch) => ({
  handleViewSelect: (navButtonNum) => dispatch(handleViewSelect(navButtonNum)),
  resetView: () => dispatch(resetView())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoButton));
