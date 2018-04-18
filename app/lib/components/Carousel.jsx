import React, {Component} from 'react';
import styles from '../../App.scss';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import DataVisualization from './DataVisualization.jsx';
import ModalWrapper from './modals/ModalWrapper.jsx';
import HeatMap from './views/HeatMap.jsx';
import {toggleModal, handleSiteSelect, handleDeviceSelect} from '../actions/view_actions';
import {setAutoplay} from '../actions/touch_actions';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import modalStyle from '../assets/stylesheets/modal';
import {COLLEGE_NAMES} from '../constants/constants';
import {AUTOPLAY} from '../constants/settings';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-108280148-1', {
  // debug: true,
  titleCase: false,
  // gaOptions: {
  //   userId: 123
  // }
});


class Carousel extends Component {
  constructor(props) {
    super(props);
    const site = COLLEGE_NAMES[Number(props.match.params.siteIndex)];
    props.handleSiteSelect(site);
    props.handleDeviceSelect(props.match.params.device);
    this.touchHandler = this.touchHandler.bind(this);
  }

  touchHandler(e) {
    // console.log("TOUCH EVENT!!!");
    this.sendGoogleAnalytics(e.target.id);
    this.props.handleTouchEvent();
  }

  sendGoogleAnalytics(touchID) {
    let categories = [
      'NavButton',
      'InfoButton',
      'ScopeButton',
      'OtherTouch'
    ];

    if (!categories.some( category => touchID.search(category) >= 0 )) {
      touchID = 'OtherTouch';
    }

    let siteName = this.props.currentView.site;
    let device = this.props.currentView.device;
    let category = touchID;
    let action = device + '_' + siteName + '_' + touchID;
    let label = device + '_' + siteName;

    //sample analytics event:
    // category: 'NavButton_Leaderboard'
    // action: 'touchscreen_College 9_NavButton_Leaderboard'
    // label: 'touchscreen_College 9'
    ReactGA.set({ page: this.props.match.url });
    ReactGA.event({ category, action, label });
    if (device !== 'touchscreen') ReactGA.pageview(this.props.match.url);
  }



  render() {
    return (
      <div className={styles.page} onMouseDown={this.touchHandler}>
        <NavBar />
        <DataVisualization/>
        <Footer/>
        <Modal
          isOpen={this.props.modalState}
          contentLabel="Modal"
          onRequestClose={ () => this.props.toggleModal(false) }
          style={modalStyle}>
          <ModalWrapper/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.records.data,
  modalState: !!state.currentView.modal,
  currentView: state.currentView,
});

const mapDispatchToProps = (dispatch) => {
  let timer = null;
  return ({
    toggleModal: (type) => dispatch(toggleModal(type)),
    handleSiteSelect: (site) => dispatch(handleSiteSelect(site)),
    handleDeviceSelect: (device) => dispatch(handleDeviceSelect(device)),
    handleTouchEvent: () => {
      clearTimeout(timer);
      dispatch(setAutoplay('off'));
      timer = setTimeout(() => dispatch(setAutoplay('on')), AUTOPLAY.restartInterval);
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
