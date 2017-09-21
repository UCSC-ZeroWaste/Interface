import React, {Component} from 'react';
import styles from '../../App.css';

import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import DataVisualization from './DataVisualization.jsx';
import InfoModal from './InfoModal.jsx';
import HeatMap from './views/HeatMap.jsx';
import {toggleModal, handleSiteSelect, handleDeviceSelect} from '../actions/view_actions';
import {setAutoplay} from '../actions/touch_actions';

import {connect} from 'react-redux';
import Modal from 'react-modal';
import modalStyle from '../assets/stylesheets/modal';
import {COLLEGE_NAMES} from '../constants/constants';
import {AUTOPLAY} from '../constants/settings';

class Carousel extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    // console.log('THIS', props.match.params.siteIndex, COLLEGE_NAMES[Number(props.match.params.siteIndex)]);
    // console.log('THIS', props.match.params.siteIndex);
    // console.log(COLLEGE_NAMES[1]);
    // console.log('props.match', props.match);
    // console.log('props.location', props.location);
    // console.log('props.history', props.history);
    const site = COLLEGE_NAMES[Number(props.match.params.siteIndex)];
    props.handleSiteSelect(site);
    props.handleDeviceSelect(props.match.params.device);
    this.touchHandler = this.touchHandler.bind(this);
  }

  touchHandler(e) {
    // console.log("TOUCH EVENT!!!", e.target);
    this.props.handleTouchEvent();
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
          onRequestClose={this.props.toggleModal}
          style={modalStyle}>
          <InfoModal />
        </Modal>
      </div>
    );
  }
}

// <Route path={`${this.props.match.url}/carousel/site/:siteIndex`} component={Carousel} />


const mapStateToProps = (state) => ({
  data: state.records.data,
  modalState: state.currentView.modal
});

const mapDispatchToProps = (dispatch) => {
  let timer = null;
  return ({
    toggleModal: () => dispatch(toggleModal()),
    handleSiteSelect: (site) => dispatch(handleSiteSelect(site)),
    handleDeviceSelect: (device) => dispatch(handleDeviceSelect(device)),
    handleTouchEvent: (setting) => {
      clearTimeout(timer);
      dispatch(setAutoplay('off'));
      timer = setTimeout(() => dispatch(setAutoplay('on')), AUTOPLAY.restartInterval);
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
