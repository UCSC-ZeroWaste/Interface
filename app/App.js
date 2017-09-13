import React from 'react';
import styles from './App.css';
import NavBar from './lib/components/NavBar.jsx';
import Footer from './lib/components/Footer.jsx';
import DataVisualization from './lib/components/DataVisualization.jsx';
import InfoModal from './lib/components/InfoModal.jsx';
import HeatMap from './lib/components/views/HeatMap.jsx';
import { Provider } from 'react-redux';
import {fetchRecords, fetchDummyRecords} from './lib/actions/record_actions';
import {toggleModal} from './lib/actions/view_actions';
import {connect} from 'react-redux';
import _ from 'underscore';

import TestTransitions from './lib/components/test_carousel/TestTransitions';
import TestRouter from './lib/components/test_carousel/TestRouter';
import TestSlide from './lib/components/test_carousel/TestSlide';
import Modal from 'react-modal';
import modalStyle from './lib/assets/stylesheets/modal';

const API_ENDPOINTS = {
  15: 'http://zerowaste.ucsc.edu:3001/api/days/15',
  30: 'http://zerowaste.ucsc.edu:3001/api/days/30',
  45: 'http://zerowaste.ucsc.edu:3001/api/days/45',
  60: 'http://zerowaste.ucsc.edu:3001/api/days/60',
  fall: 'http://zerowaste.ucsc.edu:3001/api/2017/fall',
  spring: 'http://zerowaste.ucsc.edu:3001/api/2017/spring'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    //TODO currently only getting records when the app loads
    props.getRecords(API_ENDPOINTS['fall']);
    // props.getDummyRecords();
  }

  render() {
    let assetType = _.groupBy(this.props.data, 'AssetType');
    let Product = _.groupBy(this.props.data, 'Product');
    // console.log(
    //   'This is AssetType: ',
    //   Object.keys(assetType).map( (type) => (type + ':  ' + assetType[type].length) )
    // );
    // console.log(
    //   'This is Product: ',
    //   Object.keys(Product).map( (type) => (type + ':  ' + Product[type].length) )
    // );


    return (
      <Provider store={this.props.store}>
        <div className={styles.page}>
          <NavBar />
          <DataVisualization/>
          <Modal
            isOpen={this.props.modalState}
            contentLabel="Modal"
            onRequestClose={this.props.toggleModal}
            style={modalStyle}>
            <InfoModal />
          </Modal>
          <Footer/>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.records.data,
  modalState: state.currentView.modal
});

const mapDispatchToProps = (dispatch) => ({
  getRecords: (url) => dispatch(fetchRecords(url)),
  getDummyRecords: () => dispatch(fetchDummyRecords()),
  toggleModal: () => dispatch(toggleModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
