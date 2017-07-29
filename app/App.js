import React from 'react';
import styles from './App.css';
import Records from './lib/components/Records.js';
import SiteLeaderBoard from './lib/components/SiteLeaderBoard.js';
import NavBar from './lib/components/navbar.jsx';

export default class App extends React.Component {
  render() {
    var RecordSet = Records;
    return (
      <div>
        <NavBar/>
        <RecordSet/>
        <Records>
          <SiteLeaderBoard/>
        </Records>
      </div>
    );
  }
}
