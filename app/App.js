import React from 'react';
import styles from './App.css';
import NavBar from './lib/components/navbar/navbar.jsx';
import DataVisual from './lib/components/data_visual.jsx';
import { Provider } from 'react-redux';
import {fetchRecords} from './lib/actions/records_actions';
import {connect} from 'react-redux';
// const App = ({store}) => {
//     return (
//       <Provider store={store}>
//         <NavBar/>
//         <Records/>
//       </Provider>
//     );
// };
//
// export default App;
class App extends React.Component {
  constructor(props) {
    super(props);
    props.getRecords();
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <NavBar/>
          <DataVisual/>
        </div>
      </Provider>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getRecords: () => dispatch(fetchRecords())
});

export default connect(null, mapDispatchToProps)(App);

//TODO add this back to render
// <Records/>
