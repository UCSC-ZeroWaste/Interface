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
    let tmp = _.groupBy(this.props.data.recordset, 'AssetType');
    console.log('THIS IS TMP', tmp, Object.keys(tmp));

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
