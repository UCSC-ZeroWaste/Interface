import React from 'react';
import styles from './App.css';
import Records from './lib/components/Records.js';
// import LeaderBoard from './lib/components/LeaderBoard.js';
import NavBar from './lib/components/navbar.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Records/>
      </div>
    );
  }
}
