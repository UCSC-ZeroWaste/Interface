import React, {Component} from 'react';
import styles from '../../../App.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {handleViewSelect} from '../../actions/view_actions';


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
    // if (device === 'home') {
    //   this.props.history.push(`/home`);
    // }

    //redux version:
    if (this.props.device !== 'touchscreen') {
      this.props.history.push(`/home`);
    } else {
      this.props.handleViewSelect(0);
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

const mapDispatchToProps = (dispatch) => ({
  handleViewSelect: (navButtonNum) => dispatch(handleViewSelect(navButtonNum))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoButton));
