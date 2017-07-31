import React from 'react';
import styles from './App.css';
import Records from './lib/components/Records.js';
import NavBar from './lib/components/navbar.jsx';
import DataVisual from './lib/components/data_visual.jsx';
import { Provider } from 'react-redux';

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
export default class App extends React.Component {
  constructor(props) {
    super(props);
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
//TODO add this back to render
// <Records/>
