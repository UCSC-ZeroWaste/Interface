import React from 'react';
import styles from './App.css';
import Records from './lib/components/Records.js';
import SiteLineChart from './lib/components/SiteLineChart.js';
import SiteLeaderBoard from './lib/components/SiteLeaderBoard.js';

export default class App extends React.Component {
  render() {
    var RecordSet = Records;
    return (
      <div>
        <div className={styles.bap}>
          Zero Waste
        </div>
        <RecordSet/>
        <Records>
          <SiteLeaderBoard/>
        </Records>
      </div>
    );
  }
}
