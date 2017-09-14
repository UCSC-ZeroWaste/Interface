import React from 'react';
import styles from './App.css';
import Carousel from './lib/components/Carousel.jsx';
import LandingPage from './lib/components/LandingPage.jsx';

import { Provider } from 'react-redux';
import {fetchRecords, fetchDummyRecords} from './lib/actions/record_actions';

import {connect} from 'react-redux';
import _ from 'underscore';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

// import TestTransitions from './lib/components/test_carousel/TestTransitions';
// import TestRouter from './lib/components/test_carousel/TestRouter';
// import TestSlide from './lib/components/test_carousel/TestSlide';


const API_ENDPOINTS = {
  '15': 'http://zerowaste.ucsc.edu:3001/api/days/15',
  '30': 'http://zerowaste.ucsc.edu:3001/api/days/30',
  '45': 'http://zerowaste.ucsc.edu:3001/api/days/45',
  '60': 'http://zerowaste.ucsc.edu:3001/api/days/60',
  fall: 'http://zerowaste.ucsc.edu:3001/api/2017/fall',
  spring: 'http://zerowaste.ucsc.edu:3001/api/2017/spring'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    //TODO Only getting records when the app loads. OK?
    props.getRecords(API_ENDPOINTS['30']);
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
        <HashRouter>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/:device/carousel/site/:siteIndex" component={Carousel} />
            {
              //default routing when no path matches
            }
            <Redirect from="*" to="/"/>
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.records.data,
});

const mapDispatchToProps = (dispatch) => ({
  getRecords: (url) => dispatch(fetchRecords(url)),
  getDummyRecords: () => dispatch(fetchDummyRecords()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
