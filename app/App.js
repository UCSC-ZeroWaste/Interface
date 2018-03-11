import React from 'react';
import styles from './App.scss';
import Carousel from './lib/components/Carousel.jsx';
import LandingPage from './lib/components/LandingPage.jsx';
import { Provider } from 'react-redux';
import {fetchRecords, createRandomRecordSet} from './lib/actions/record_actions';
import {connect} from 'react-redux';
import _ from 'underscore';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import moment from 'moment';

// spring dates:
//   springStart = `'2017-04-03'`;
//   springEnd = `'2017-06-15'`;
// fall dates:
//   fallStart = `'2017-09-23'`;
//   fallEnd = `'2017-12-15'`;
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

  }
  fetchData() {
    console.log('fetching data: ', moment().format("YYYY-MM-DD HH:mm:ss"));
    this.props.getRecords(API_ENDPOINTS['60']);
  }

  componentDidMount() {
    let dayInMilliseconds = 24 * 60 * 60 * 1000;
    var start = moment.utc(moment().format("HH:mm:ss"), "HH:mm:ss");
    var end = moment.utc("3:35:00", "HH:mm:ss");
    if (end.isBefore(start)) end.add(1, 'day');
    let timeoutInterval = end.diff(start);

    this.fetchData();

    window.setTimeout(()=> {
      this.fetchData();
      window.setInterval(() => this.fetchData(), dayInMilliseconds);
    }, timeoutInterval);
    // setTimeout(this.props.getRandomRecordSet, .1);
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
  getRandomRecordSet: () => dispatch(createRandomRecordSet()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
