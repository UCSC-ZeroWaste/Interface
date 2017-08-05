import React from 'react';
import styles from './App.css';
import NavBar from './lib/components/NavBar.jsx';
import DataVisualization from './lib/components/DataVisualization.jsx';
import { Provider } from 'react-redux';
import {fetchRecords} from './lib/actions/records';
import {connect} from 'react-redux';
import _ from 'underscore';

class App extends React.Component {
  constructor(props) {
    super(props);
    //TODO currently only getting records when the app loads
    props.getRecords();
  }

  render() {
    let assetType = _.groupBy(this.props.data, 'AssetType');
    let Product = _.groupBy(this.props.data, 'Product');
    console.log(
      'This is AssetType: ',
      Object.keys(assetType).map( (type) => (type + ':  ' + assetType[type].length))
    );
    console.log('This is Product: ', Object.keys(Product).map( (type) => (type + ':  ' + Product[type].length) ));


    return (
      <Provider store={this.props.store}>
        <div >
          <NavBar/>
          <DataVisualization/>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.records
});

const mapDispatchToProps = (dispatch) => ({
  getRecords: () => dispatch(fetchRecords())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
