import React from 'react';
import styles from './App.css';
import Records from './lib/components/Records.js';
import NavBar from './lib/components/navbar.jsx';
import { Provider } from 'react-redux';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <NavBar/>
        <Records/>
      </Provider>
    );
  }
}
